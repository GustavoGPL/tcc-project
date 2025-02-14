import { TCreateReport, TReport } from '@/types/reports';
import api from '../api';

export const ReportService = {
	getAll: async (): Promise<TReport[]> => {
		const response = await api.get<TReport[]>(`/reports`); // Tipando a resposta
		return response.data; // Retorna os dados do array diretamente
	},
	getById: async (id: string): Promise<TReport> => {
		const response = await api.get(`/reports/${id}`);
		return response.data;
	},

	create: async (data: TCreateReport): Promise<TReport> =>
		await api.post('/reports', data),

	update: async (reportId: string, body: TCreateReport): Promise<TReport> =>
		await api.put(`/reports/${reportId}`, body),

	delete: async (id: string) => await api.delete(`/reports/${id}`),

	finish: async (reportId: string): Promise<TReport> =>
		await api.put(`/reports/${reportId}/finalize`),
};
