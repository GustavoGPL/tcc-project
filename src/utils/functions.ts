export const estadosDoBrasil = [
	{ nome: 'Acre', sigla: 'AC' },
	{ nome: 'Alagoas', sigla: 'AL' },
	{ nome: 'Amapá', sigla: 'AP' },
	{ nome: 'Amazonas', sigla: 'AM' },
	{ nome: 'Bahia', sigla: 'BA' },
	{ nome: 'Ceará', sigla: 'CE' },
	{ nome: 'Distrito Federal', sigla: 'DF' },
	{ nome: 'Espírito Santo', sigla: 'ES' },
	{ nome: 'Goiás', sigla: 'GO' },
	{ nome: 'Maranhão', sigla: 'MA' },
	{ nome: 'Mato Grosso', sigla: 'MT' },
	{ nome: 'Mato Grosso do Sul', sigla: 'MS' },
	{ nome: 'Minas Gerais', sigla: 'MG' },
	{ nome: 'Pará', sigla: 'PA' },
	{ nome: 'Paraíba', sigla: 'PB' },
	{ nome: 'Paraná', sigla: 'PR' },
	{ nome: 'Pernambuco', sigla: 'PE' },
	{ nome: 'Piauí', sigla: 'PI' },
	{ nome: 'Rio de Janeiro', sigla: 'RJ' },
	{ nome: 'Rio Grande do Norte', sigla: 'RN' },
	{ nome: 'Rio Grande do Sul', sigla: 'RS' },
	{ nome: 'Rondônia', sigla: 'RO' },
	{ nome: 'Roraima', sigla: 'RR' },
	{ nome: 'Santa Catarina', sigla: 'SC' },
	{ nome: 'São Paulo', sigla: 'SP' },
	{ nome: 'Sergipe', sigla: 'SE' },
	{ nome: 'Tocantins', sigla: 'TO' },
	{ nome: 'Argentina', sigla: 'AR' },
];

export const convertToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result);
			} else {
				reject(new Error('File could not be converted to base64'));
			}
		};
		reader.onerror = error => reject(error);
	});
};

export default function formatCPF(cpf: string) {
	const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
	return cpf.replace(cpfRegex, '$1.$2.$3-$4');
}
