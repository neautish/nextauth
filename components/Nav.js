"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Nav() {
	const { data: session, status } = useSession();
	const pathname = usePathname();

	const [toggleDropdown, setToggleDropdown] = useState(false);
	const [providers, setProviders] = useState(null);

	// Close dropdown on outside click
	useEffect(() => {
		const closeDropdown = (event) => {
			if (!event.target.className.includes("avatar")) {
				setToggleDropdown(false);
			}
		};
		window.addEventListener("click", closeDropdown);

		return () => {
			window.removeEventListener("click", closeDropdown);
		};
	}, []);

	// Get providers
	useEffect(() => {
		(async () => {
			const providers = await getProviders();
			setProviders(providers);
		})();
	}, []);

	return (
		<header className="w-full mb-4">
			<nav className="flex justify-between items-center py-2">
				<Link href="/" className="flex items-center gap-2">
					<Image className="object-contain" src="/assets/icons/authentication.svg" alt="logo" width={45} height={45} />
					<h1 className="font-semibold sm:text-lg text-blue-700">NextAuth</h1>
				</Link>

				{/* Desktop */}
				<div className="hidden sm:flex">
					<ul className="flex gap-5">
						<li>
							<Link href="/" className={pathname === "/" ? "active_link" : "menu_link"} onClick={() => setToggleDropdown(false)}>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/admin-protected"
								className={pathname === "/admin-protected" ? "active_link" : "menu_link"}
								onClick={() => setToggleDropdown(false)}
							>
								Admin
							</Link>
						</li>
						<li>
							<Link
								href="/profile"
								className={pathname === "/profile" ? "active_link" : "menu_link"}
								onClick={() => setToggleDropdown(false)}
							>
								Profile
							</Link>
						</li>
					</ul>
				</div>

				{/* Mobile */}
				<div className="flex items-center">
					{status === "authenticated" ? (
						<div className="flex relative">
							<Image
								src={session?.user.image || "/assets/icons/user-icon.png"}
								alt="profile"
								className="rounded-full avatar"
								width={40}
								height={40}
								onClick={() => setToggleDropdown((prev) => !prev)}
							/>

							{toggleDropdown && (
								<div className="dropdown">
									<h3 className="text-base font-bold">{session?.user.name}</h3>
									<h4 className="text-sm font-semibold text-slate-600 mb-3">{session?.user.email}</h4>

									<ul className="sm:hidden">
										<li className="my-1">
											<Link href="/" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
												Home
											</Link>
										</li>
										<li className="my-1">
											<Link href="/admin-protected" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
												Admin
											</Link>
										</li>
										<li className="my-1">
											<Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
												Profile
											</Link>
										</li>
									</ul>
									<button
										type="button"
										className="mt-5 text-slate-500 hover:text-red-400 w-full text-sm"
										onClick={() => {
											setToggleDropdown(false);
											signOut();
										}}
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							{providers && (
								<div>
									<a
										className="border rounded-lg px-4 py-2 text-sm font-semibold hover:text-blue-500"
										href="/api/auth/signin"
										onClick={(e) => {
											e.preventDefault();
											signIn();
										}}
									>
										Sign In
									</a>
								</div>
							)}
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Nav;
