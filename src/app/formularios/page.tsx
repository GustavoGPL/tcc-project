'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CardTitle } from '@/components/ui/card';
import BackButton from '@/components/back-button';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { DriversService } from '@/services/models/drivers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TCreateDriver } from '@/types/drivers';
import { ReportService } from '@/services/models/reports';
import { TCreateReport } from '@/types/reports';
import { Label } from '@/components/ui/label';
import { convertToBase64 } from '@/utils/functions';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { queryClient } from '@/utils/react-query';
import { SkeletonForm } from '@/components/skeleton-form';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
	description: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
	// image: z.string().min(1, {
	// 	message: 'Campo obrigatório',
	// }),
});

export default function RegisterSquare() {
	const params = useSearchParams();

	const { data: session } = useSession();

	const reportId = params.get('report') || '';

	const router = useRouter();

	const [imgBase64, setImgBase64] = useState('');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			// image: '',
		},
	});

	const fetchReport = useCallback(async () => {
		try {
			const loadedReport = await ReportService.getById(reportId);
			if (!loadedReport) {
				throw new Error();
			}

			form.setValue('title', loadedReport?.title);
			form.setValue('description', loadedReport?.description);

			// if (loadedReport.image) {
			// 	setImgBase64(loadedReport.image);
			// }
			// form.setValue('image', loadedReport?.image);

			return loadedReport;
		} catch (error) {
			toast.error('Erro ao carregar relatório', {
				toastId: 'error',
			});
		}
	}, [form, reportId]);

	const {
		data: report,
		isFetching,
		error,
	} = useQuery({
		queryKey: ['getReport', reportId],
		queryFn: fetchReport,
		enabled: Boolean(reportId),
	});

	const createMutation = useMutation({
		mutationFn: (body: TCreateReport) => {
			if (reportId) {
				return ReportService.update(reportId, body);
			} else {
				return ReportService.create(body);
			}
		},
		onSuccess: data => {
			queryClient.invalidateQueries({
				queryKey: ['getAllReports'],
			});
			toast.success(`Relatório ${reportId ? 'editado' : 'cadastrado'}`);
			router.push('/');
		},
		onError: err => {
			console.error(err);
			toast.error('Erro ao cadastrar relatório. tente novamente', {
				toastId: 'error',
			});
		},
	});

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			const processedValues = {
				...values,
				image: imgBase64 ? imgBase64.split(',')[1] : '', // remover da string data:image/jpeg;base64,
				createdBy: session?.user?.email || '',
			};
			createMutation.mutate(processedValues);
			console.log('Values processed', processedValues);
		},
		[createMutation, imgBase64, session?.user?.email]
	);

	return (
		<div className="flex h-full flex-1 order-2 sm:order-3  flex-col items-center bg-opacity-50 mt-10">
			<div className="bg-white w-full lg:w-table_width rounded-lg shadow-md flex flex-col px-10 py-2 md:p-8 mb-4 items-center">
				<div className="w-full flex flex-row gap-5 items-center">
					<BackButton />
					<CardTitle className="text-center font-bold text-[#121D31] text-xl md:text-2xl">
						{reportId ? `Editar Relatório` : 'Cadastrar Relatório'}
					</CardTitle>
				</div>
				<div className="flex flex-col items-center gap-6 mb-8">
					<div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full max-w-[900px] bg-gray-50 hover:bg-gray-100 transition-colors">
						{imgBase64 ? (
							<Image
								alt="Imagem do produto"
								src={imgBase64}
								width={600}
								height={600}
								className="max-w-full max-h-[300px] object-contain rounded-md"
							/>
						) : report?.image ? (
							<Image
								alt="Imagem do produto"
								src={`data:image/jpeg;base64,${report.image}`}
								width={600}
								height={600}
								className="max-w-full max-h-[300px] object-contain rounded-md"
							/>
						) : (
							<div className="flex flex-col items-center gap-4 text-gray-500">
								<Image
									alt="Sem imagem"
									src="/images/no-image.png"
									width={180}
									height={180}
									className="opacity-70"
								/>
								<p className="text-sm">Nenhuma imagem selecionada</p>
							</div>
						)}
					</div>

					<label
						htmlFor="image-upload"
						className="flex items-center justify-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 16.5v-9m-3.75 4.5h7.5M21 16.5v2.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75V16.5M12 7.5L8.25 4.5m7.5 0L12 7.5"
							/>
						</svg>
						<span>Selecionar Imagem</span>
					</label>

					<input
						id="image-upload"
						type="file"
						className="hidden"
						onChange={async e => {
							const filesArray = Array.from(e.target.files || []);

							if (filesArray.length) {
								const file = filesArray[0];
								const type = file.type.split('/')[0];

								if (type === 'image') {
									const base64 = await convertToBase64(file);
									setImgBase64(base64); // Atualiza o estado com a nova imagem
								}
							}
						}}
						accept="image/*"
					/>
				</div>
				{isFetching ? (
					<SkeletonForm />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full flex flex-col items-center gap-5"
						>
							<div className="grid grid-cols-1 gap-5 w-1/2">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Título *</FormLabel>
											<FormControl>
												<Input
													placeholder="Título do relatório"
													className="grid-cols-2 md:grid-cols-1"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Descrição *</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Descrição do relatório"
													className="grid-cols-2 md:grid-cols-1 min-h-32"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<span className="flex justify-center">
								<Button
									type="submit"
									className="w-[300px] bg-green-500 hover:bg-green-600"
								>
									{reportId ? 'Editar' : 'Cadastrar'}
								</Button>
							</span>
						</form>
					</Form>
				)}
			</div>
		</div>
	);
}
