'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSignIn = async () => {
		setLoading(true);
		setError(null);

		try {
			await signIn('google');
		} catch (err) {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
			<div className="bg-white shadow-xl rounded-lg p-8 w-[90%] max-w-md text-center">
				<div className="mb-6">
					<h1 className="text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">
						<span className="text-green-500">IF</span>
						<span className="text-yellow-500">raestrutural</span>
					</h1>
				</div>

				<p className="text-gray-700 mb-4">
					Entre para acessar o sistema e gerenciar sua frota!
				</p>

				{error && (
					<div className="text-red-500 bg-red-100 p-2 rounded mb-4">
						{error}
					</div>
				)}

				<button
					onClick={handleSignIn}
					className={`${
						loading
							? 'bg-blue-400 cursor-not-allowed'
							: 'bg-blue-600 hover:bg-blue-700'
					} w-full flex items-center justify-center gap-2 p-3 text-white rounded-lg font-semibold transition-all duration-300`}
					disabled={loading}
				>
					{loading ? (
						<svg
							className="animate-spin h-5 w-5 text-white"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8v8H4z"
							></path>
						</svg>
					) : (
						<>
							<FaGoogle className="text-lg" />
							Login com o Google
						</>
					)}
				</button>
			</div>

			<footer className="text-sm text-gray-400 mt-6">
				© 2024 Todos os direitos reservados.
			</footer>
		</div>
	);
}
