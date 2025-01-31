'use client';
import Link from 'next/link';
import { MdConstruction } from 'react-icons/md';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function Header() {
	const { data: session } = useSession();

	const userImage = session?.user?.image ?? undefined;
	console.log(session);

	const handleLogin = () => {
		if (!session?.user?.email) {
			redirect('/login');
		} else {
			redirect('/');
		}
	};
	return (
		<div className="flex flex-col w-full">
			<header className="relative z-50 w-full bg-[#2c3e50] shadow-md">
				<div className="w-full text-right overflow-x-hidden">
					<div className="relative flex flex-row gap-10 md:flex-row justify-between items-center p-4 py-6">
						<Link
							href="/"
							className="flex items-center justify-between w-full sm:w-auto"
						>
							<div className="text-white flex justify-between items-center space-x-3 w-full">
								<h1 className="flex flex-row-reverse items-center gap-3 text-2xl font-noto font-semibold tracking-wide">
									<div>
										<p className="flex flex-row text-green-500">
											IF<span className="text-yellow-300">raestrutural</span>
										</p>
										{/* <p className="text-yellow-500">Estrutural</p> */}
									</div>
									<MdConstruction size={40} />
								</h1>
							</div>
						</Link>

						<div className="flex">
							<Popover>
								<PopoverTrigger asChild>
									<Avatar className="w-12 h-12 cursor-pointer block md:block">
										<AvatarImage src={userImage} alt="@shadcn" />
										<AvatarFallback className="bg-[#f39c12] text-white font-bold uppercase text-lg">
											{session?.user?.name
												?.split(' ')
												.map(palavra => palavra.substring(0, 1))
												.join('')}
										</AvatarFallback>
									</Avatar>
								</PopoverTrigger>
								<PopoverContent className="mr-3 w-70 flex flex-col gap-4">
									<p className="text-center">{session?.user?.email}</p>
									<p className="flex justify-center">
										<Button
											variant={'outline'}
											onClick={() => {
												signOut();
												handleLogin();
											}}
										>
											Sair
										</Button>
									</p>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
