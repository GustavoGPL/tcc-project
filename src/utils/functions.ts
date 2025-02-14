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
