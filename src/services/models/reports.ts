import { TCreateReport, TReport } from '@/types/reports';
import api from '../api';
import { TCreateDriver, TDriver } from '@/types/drivers';

export const ReportService = {
	// getAll: (): Promise<TAis[]> => api.get('/ccds/ais'),
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

	// create: async (data: TCreateUser): Promise<TCreateUser> =>
	// 	await api.post('/auth/save', data),

	// update: (userId: number, body: TUpdateUser) => {
	// 	api.put(`/usuarios/update/admin/${userId}`, body);
	// },

	// // função usada apenas por ADMINS (edita todo o usuário)
	// updateAdmin: (userId: number, body: TUpdateAdminUser) => {
	// 	api.put(`/update/admin/${userId}`, body);
	// },
};
