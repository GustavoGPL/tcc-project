'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import Dashboard from './components/dashboard';
import { queryClient } from '@/utils/react-query';
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
				<Dashboard
					reports={data || []}
					isFetching={isFetching}
					onFinish={handleFinish}
					onDelete={handleDelete}
				/>
			</div>
		</div>
	);
};

export default Home;
