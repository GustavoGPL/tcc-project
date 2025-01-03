import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { DriversService } from '@/services/models/drivers';
import { TruckService } from '@/services/models/trucks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { estadosDoBrasil } from '@/utils/functions';
import { TCreateDelivery } from '@/types/deliveries';
import { DeliveriesService } from '@/services/models/deliveries';
import { toast } from 'react-toastify';
import { queryClient } from '@/utils/react-query';
import { TCreateReport } from '@/types/reports';
import { ReportService } from '@/services/models/reports';

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Título é obrigatório',
	}),
	description: z.string().min(1, {
		message: 'Descrição é obrigatório',
	}),
	image: z.string().optional(),
});

export function DeliveryModal() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			image: '',
		},
	});

	const createReportMutation = useMutation({
		mutationFn: (body: TCreateReport) => ReportService.create(body),
		onSuccess: () => {
			toast.success(`Relatório criado com sucesso`);
			queryClient.invalidateQueries({
				queryKey: ['getAllReports'],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			console.log('Values', values);
			// const processedValues = {
			// 	...values,
			// 	valorCarga: parseFloat(values.valorCarga),
			// 	temSeguro: values.temSeguro === 'true' ? true : false,
			// };
			createReportMutation.mutate(values);
		},
		[createReportMutation]
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-green-500 hover:bg-green-600">
					Novo Relatório
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px] sm:h-[300px]">
				<DialogHeader>
					<DialogTitle>Criar relatório</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-3"
					>
						<div className="grid md:grid-cols-2 gap-2">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Título *</FormLabel>
										<FormControl>
											<Input
												placeholder="Título"
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
												placeholder="Descrição"
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
										<FormLabel>Imagem </FormLabel>
										<FormControl>
											<Input
												type="file"
												placeholder="Imagem"
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
								Salvar
							</Button>
						</span>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
