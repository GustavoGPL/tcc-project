'use client';

import { useState } from 'react';
import { TDelivery } from '@/types/deliveries';
import { DeliveryModal } from './deliveryModal';
import { Label } from '@/components/ui/label';
import { SkeletonCard } from '@/components/skeleton-card';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { TReport } from '@/types/reports';
import Link from 'next/link';

type DashboardProps = {
	reports: TReport[];
	isFetching: boolean;
	onDelete: (id: string) => void;
	onFinish: (id: string) => void;
};

const Dashboard: React.FC<DashboardProps> = ({
	reports,
	isFetching,
	onDelete,
	onFinish,
}) => {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [deliveryToDelete, setDeliveryToDelete] = useState<string>('');
	const [deliveryToFinish, setDeliveryToFinish] = useState<string>('');

	const handleDeleteClick = (id: string) => {
		setDeliveryToDelete(id);
	};

	const handleFinishClick = (id: string) => {
		setDeliveryToFinish(id);
	};

	const handleConfirmDelete = () => {
		if (deliveryToDelete) {
			onDelete(deliveryToDelete);
			setDeliveryToDelete('');
		}
	};

	const handleConfirmFinish = () => {
		if (deliveryToFinish) {
			onFinish(deliveryToFinish);
			setDeliveryToFinish('');
		}
	};

	return (
		<>
			<div className="flex flex-col justify-between items-center mb-6 sm:flex-row">
				<h2 className="text-3xl font-bold text-gray-600">Relatórios</h2>
				<div className="flex flex-col sm:flex-row justify-end gap-3">
					{/* <div className="flex flex-col sm:flex-row items-center">
						<Label className="mr-2 text-md">Filtrar por data de início:</Label>
						<input
							type="date"
							value={selectedDate}
							onChange={e => setSelectedDate(e.target.value)}
							className="border rounded p-2 text-gray-700"
						/>
					</div> */}
					<div>
						<Link
							className="bg-green-500 hover:bg-green-600 p-3 text-white rounded-md"
							href={'/formularios'}
						>
							Novo Relatório
						</Link>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6">
				{reports.length > 0 ? (
					reports.map(report => (
						<div
							key={report._id}
							className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition cursor-pointer flex flex-col"
						>
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-xl font-semibold text-gray-800">
									{report.title}
								</h3>
								{report.isActive ? (
									<span className="px-3 py-1 text-sm font-bold rounded bg-green-200 text-green-800">
										{report.isActive ? 'Ativo' : 'Inativo'}
									</span>
								) : (
									<span className="px-3 py-1 text-sm font-bold rounded bg-red-200 text-red-800">
										{report.isActive ? 'Ativo' : 'Inativo'}
									</span>
								)}
							</div>
							<p className="text-gray-600 text-base mb-2">
								<strong>Descrição:</strong> {report.description}
							</p>
							<p className="text-gray-600 text-base mb-2">
								<strong>Criado por:</strong> {report.createdBy}
							</p>

							<div className="mt-4 flex gap-3 justify-end border-t-[1px] border-slate-300 pt-2">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											className="bg-green-500 hover:bg-green-600"
											onClick={() => handleFinishClick(report._id)}
											disabled={!report.isActive}
										>
											Concluir
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-80">
										<div className="flex flex-col gap-4">
											<h3 className="text-lg font-semibold">
												Confirmar Concluir
											</h3>
											<p className="text-sm text-muted-foreground">
												<p className="text-red-500 font-bold">
													Esta ação não poderá ser desfeita e irá concluir esse
													relatório!
												</p>
												Você tem certeza que deseja concluir esse relatório?
											</p>
											<div className="flex justify-end gap-3">
												<Button
													className="bg-yellow-400 hover:bg-yellow-500 text-black"
													onClick={handleConfirmFinish}
												>
													Confirmar
												</Button>
											</div>
										</div>
									</PopoverContent>
								</Popover>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="destructive"
											onClick={() => handleDeleteClick(report._id)}
										>
											Excluir
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-80">
										<div className="flex flex-col gap-4">
											<h3 className="text-lg font-semibold">
												Confirmar Exclusão
											</h3>
											<p className="text-sm text-muted-foreground">
												<p className="text-red-500 font-bold">
													Esta ação não poderá ser desfeita e irá exluir esse
													relatório dos registros!
												</p>
												Você tem certeza que deseja excluir esse relatório?
											</p>
											<div className="flex justify-end gap-3">
												<Button
													variant="destructive"
													onClick={handleConfirmDelete}
												>
													Confirmar
												</Button>
											</div>
										</div>
									</PopoverContent>
								</Popover>
								<Link
									className="flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 text-white rounded-md w-[83px]"
									href={`/formularios?report=${report._id}`}
								>
									Editar
								</Link>
							</div>
						</div>
					))
				) : isFetching ? (
					<SkeletonCard />
				) : (
					<p className="text-gray-600 col-span-full text-center">
						{selectedDate
							? 'Nenhuma entrega encontrada para a data selecionada.'
							: 'Nenhuma entrega disponível.'}
					</p>
				)}
			</div>
		</>
	);
};

export default Dashboard;
