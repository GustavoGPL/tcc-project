'use client';

import { Card } from '@/components/ui/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DeliveriesService } from '@/services/models/deliveries';
import Dashboard from './components/dashboard';
import { ValorDiario } from './components/valorDiario';
import { TotalEntregas } from './components/totalEntregas';
import { TruckService } from '@/services/models/trucks';
import { queryClient } from '@/utils/react-query';
import { useEffect, useState } from 'react';
import DynamicPagination from '@/components/dynamic-pagination';
import { toast } from 'react-toastify';
import { ReportService } from '@/services/models/reports';

const Home = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['getAllReports'],
		queryFn: () => ReportService.getAll(),
	});

	const deleteMutation = useMutation({
		mutationFn: (id: string) => ReportService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getAllReports'],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const finishMutation = useMutation({
		mutationFn: (id: string) => ReportService.finish(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getAllReports'],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleDelete = (id: string) => {
		deleteMutation.mutate(id);
	};

	const handleFinish = (id: string) => {
		finishMutation.mutate(id);
	};
	return (
		<div className="defaultPage">
			<div className="secondaryDiv">
				{/* <div className="flex flex-row gap-5 items-center">
					<h3 className="text-3xl font-bold text-gray-800">Relatórios</h3>
				</div> */}
				{/* <Card> */}
				<Dashboard
					reports={data || []}
					isFetching={isFetching}
					onFinish={handleFinish}
					onDelete={handleDelete}
				/>
				{/* </Card> */}
				{/* <DynamicPagination
					page={currentPage}
					setPage={setCurrentPage}
					totalPages={totalPages}
				/> */}
			</div>
		</div>
	);
};

export default Home;
