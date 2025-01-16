'use client';

import { useState } from 'react';
import { TReport } from '@/types/reports';
import Link from 'next/link';
import Image from 'next/image';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { SkeletonCard } from '@/components/skeleton-card';
import { Button } from '@/components/ui/button';

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
	const [deliveryToDelete, setDeliveryToDelete] = useState<string>('');
	const [deliveryToFinish, setDeliveryToFinish] = useState<string>('');

	const handleDeleteClick = (id: string) => setDeliveryToDelete(id);
	const handleFinishClick = (id: string) => setDeliveryToFinish(id);

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
				<div className="flex sm:flex-row justify-end gap-3">
					<Link
						className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-md"
						href={'/formularios'}
					>
						Novo Relatório
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{reports.length > 0 ? (
					reports.map(report => (
						<div
							key={report._id}
							className="border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition flex flex-col overflow-hidden"
						>
							<div className="relative w-full h-[400px] bg-gray-100 flex items-center justify-center">
								<Image
									src={
										report.image
											? `data:image/jpeg;base64,${report.image}`
											: '/images/no-image.png'
									}
									alt={report.title}
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-4 flex flex-col flex-1">
								<div className="flex justify-between items-center mb-2">
									<h3 className="text-xl font-semibold text-gray-800 truncate">
										{report.title}
									</h3>
									<span
										className={`px-3 py-1 text-sm font-bold rounded ${
											report.isActive
												? 'bg-green-200 text-green-800'
												: 'bg-red-200 text-red-800'
										}`}
									>
										{report.isActive ? 'Ativo' : 'Inativo'}
									</span>
								</div>
								<p className="text-gray-600 text-sm mb-1">
									<strong>Descrição:</strong> {report.description}
								</p>
								<p className="text-gray-600 text-sm mb-4">
									<strong>Criado por:</strong> {report.createdBy}
								</p>
								<div className="mt-auto flex gap-3 justify-end border-t pt-2">
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
													Confirmar Conclusão
												</h3>
												<p className="text-sm text-muted-foreground">
													<p className="text-red-500 font-bold">
														Esta ação não poderá ser desfeita.
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
														Esta ação não poderá ser desfeita.
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
										className="flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 text-white rounded-md px-4"
										href={`/formularios?report=${report._id}`}
									>
										Editar
									</Link>
								</div>
							</div>
						</div>
					))
				) : isFetching ? (
					<SkeletonCard />
				) : (
					<p className="text-gray-600 col-span-full text-center">
						Nenhum relatório disponível.
					</p>
				)}
			</div>
		</>
	);
};

export default Dashboard;
