'use client';
import React, { useState } from 'react';
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

const Navbar = () => {
	const [open, setOpen] = useState(true);

	const handleToggle = () => {
		setOpen(!open);
	};

	return (
		<div className="relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center py-6 md:space-x-10">
					<div className="flex gap-20 justify-between items-center ">
						<div>
							<span className="sr-only">Logo</span>
							<span>LOGO</span>
						</div>
						<div>
							<label className="relative">
								<span className="sr-only">search</span>
								<MagnifyingGlassIcon className="size-5 absolute inset-y-0 start-0 left-4   " />
								<input
									type="text"
									className="placeholder:text-slate-400  border w-full border-slate-300 rounded-md py-3 pl-10 pr-3"
									placeholder="Search for Events, Venues"
								/>
							</label>
						</div>
					</div>
					<div className="md:hidden block ml-8">
						<button type="button">
							<span className="sr-only">open menu</span>
							<Bars3Icon
								className="size-6 cursor-pointer"
								onClick={handleToggle}
							/>
						</button>
					</div>
					<div className="hidden md:block">
						<button className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
							Sign up
						</button>
					</div>
				</div>
			</div>
			<div
				className={
					open
						? 'opacity-100 scale-100 transition-transform duration-700 translate-x-0 ease-in-out absolute top-0 inset-x-0 p-2 transform md:hidden h-screen w-screen'
						: 'opacity-0 scale-95 fixed  top-0 inset-x-0 p-2 transition transform duration-700 origin-top-left md:hidden -translate-x-full h-screen w-screen'
				}>
				<div className="ring-black ring-1 ring-opacity-5 bg-white h-screen">
					<div className="pt-5 pb-6 px-5">
						<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 h-full ">
							<div>
								{' '}
								<span className="text-xl">LOGO</span>{' '}
							</div>
							<div className="mr-2">
								<button type="button">
									<XMarkIcon
										className="size-6"
										onClick={handleToggle}
									/>
								</button>
							</div>
						</div>
						<div className="mt-16">
							<nav>
								<ul className="flex justify-center items-center flex-col gap-6 text-2xl">
									<li>
										<Link
											href="/"
											onClick={handleToggle}>
											Home
										</Link>
									</li>
									<li>
										<Link
											href="/venue"
											onClick={handleToggle}>
											Venue
										</Link>
									</li>
									<li>
										<Link
											href="/artists"
											onClick={handleToggle}>
											Artist
										</Link>
									</li>
									<li>
										<Link
											href="/blogs"
											onClick={handleToggle}>
											Blogs
										</Link>
									</li>
									<li>
										<Link
											href="/contact"
											onClick={handleToggle}>
											Contact us
										</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
			<div className=" mx-auto px-16 py-2 mt-1 max-md:hidden">
				<ul className="flex justify-start gap-20 text-xl ">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/venue">Venue</Link>
					</li>
					<li>
						<Link href="/artists">Artist</Link>
					</li>
					<li>
						<Link href="/blogs">Blogs</Link>
					</li>
					<li>
						<Link href="/contact">Contact us</Link>
					</li>
				</ul>
			</div>
		</div>
	);
	// <div className='relative'>

	// {
	/* <div className="relative">
			<label className="relative">
				<span className="sr-only">search</span>
				<MagnifyingGlassIcon className="size-5 absolute inset-y-0 start-0 left-6 tśop-4   " />
				<input
					type="text"
					className="placeholder:text-slate-400 border w-full border-slate-300 rounded-md py-3 pl-10 pr-3"
					placeholder="Search for Events, Venues"
				/>
			</label>
		</div>
	);

	{
		/* responsive icons and logic */
	// 	}
	// 	// <div className="md:hidden block ml-8">
	// 	// 	<button type="button">
	// 	// 		<span className="sr-only">open menu</span>
	// 	// 		<Bars3Icon
	// 				className="size-6 cursor-pointer"
	// 				onClick={handleToggle}
	// 			/>
	// 		</button>
	// 	</div>

	// 	{
	// 		/* cta btns */
	// 	}
	// 			<div className="hidden md:block">
	// 			<button className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
	// 					Sign up
	// 					</button>
	// 			</div>
	// 		</div>
	//  	</div>
	// </div>
	// 	{
	// 		/* vertical layout */
	// 	}
	// <div
	// 	className={
	// 		open
	// 			? 'opacity-100 scale-100 transition-transform duration-700 translate-x-0 ease-in-out absolute top-0 inset-x-0 p-2 transform md:hidden h-screen w-screen'
	// 			: 'opacity-0 scale-95 fixed  top-0 inset-x-0 p-2 transition transform duration-700 origin-top-left md:hidden -translate-x-full h-screen w-screen'
	// 	}>
	// 	<div className="ring-black ring-1 ring-opacity-5 bg-white h-screen">
	// 		<div className="pt-5 pb-6 px-5">
	// 			<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 h-full ">
	// 				<div>
	// 					<span className="text-xl">LOGO</span>
	// 				</div>
	// 				<div className="mr-2">
	// 					<button type="button">
	// 						<XMarkIcon
	// 							className="size-6"
	// 							onClick={handleToggle}
	// 						/>
	// 					</button>
	// 				</div>
	// 			</div>
	// 			<div className="mt-16">
	// 				<nav>
	// 					<ul className="flex justify-center items-center flex-col gap-6 text-2xl">
	// 						<li>
	// 							<Link
	// 								href="/"
	// 								onClick={handleToggle}>
	// 								Home
	// 							</Link>
	// 						</li>
	// 						<li>
	// 							<Link
	// 								href="/venue"
	// 								onClick={handleToggle}>
	// 								Venue
	// 							</Link>
	// 						</li>
	// 						<li>
	// 							<Link
	// 								href="/artists"
	// 								onClick={handleToggle}>
	// 								Artist
	// 							</Link>
	// 						</li>
	// 						<li>
	// 							<Link
	// 								href="/blogs"
	// 								onClick={handleToggle}>
	// 								Blogs
	// 							</Link>
	// 						</li>
	// 						<li>
	// 							<Link
	// 								href="/contact"
	// 								onClick={handleToggle}>
	// 								Contact us
	// 							</Link>
	// 						</li>
	// 					</ul>
	// 				</nav>
	// 			</div>
	// 		</div>
	// 	</div>
	// </div>

	// {
	// 	/* links */
	// }
};

export default Navbar;
