'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryClient } from './react-query';
import Header from '@/components/header';
import { useSession } from 'next-auth/react';

export default function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session } = useSession();
	return (
		<QueryClientProvider client={queryClient}>
			{session?.user && <Header />}
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
			<ToastContainer />
		</QueryClientProvider>
	);
}
