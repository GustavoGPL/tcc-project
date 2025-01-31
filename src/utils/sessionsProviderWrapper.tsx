'use client';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function SessionProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	useEffect(() => {
		const checkAuthentication = async () => {
			const session = await getSession();
			if (!session?.user) {
				router.push('/login');
			} else {
				router.push('/');
			}
		};

		checkAuthentication();
	}, [router]);
	return <SessionProvider>{children}</SessionProvider>;
}
