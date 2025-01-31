export type TReport = {
	_id: string;
	title: string;
	description: string;
	image?: string;
	isActive: boolean;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
};

export type TCreateReport = Omit<
	TReport,
	'_id' | 'createdAt' | 'updatedAt' | 'isActive'
>;
