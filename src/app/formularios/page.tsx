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
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DriversService } from '@/services/models/drivers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TCreateDriver } from '@/types/drivers';
import { ReportService } from '@/services/models/reports';
import { TCreateReport } from '@/types/reports';

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
	description: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
	image: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
});

export default function RegisterSquare() {
	const params = useSearchParams();

	const reportId = params.get('report') || '';

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			image: '',
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
		isPending,
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
			toast.success(`Relatório ${reportId ? 'editado' : 'cadastrado'}`);
			router.push('/');
		},
		onError: err => {
			console.error(err);
			toast.error('Erro ao cadastrar motorista. tente novamente', {
				toastId: 'error',
			});
		},
	});

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			createMutation.mutate(values);
		},
		[createMutation]
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
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-5"
					>
						<div className="grid md:grid-cols-2 gap-5">
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
											<Input
												placeholder="Descrição do relatório"
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
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormLabel>imagem *</FormLabel>
										<FormControl>
											<Input
												type="file"
												className="grid-cols-2 md:grid-cols-1"
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
			</div>
		</div>
	);
}
