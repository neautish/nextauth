"use client";

import { useSession } from "next-auth/react";

function Admin() {
	const { data: session, status } = useSession();

	return (
		<section>
			{status === "authenticated" && session?.profile.role === "user" ? (
				<div className="flex justify-center mt-5">
					<p className="text-xl font-semibold">You are not an admin. You don't have permission to access this page.</p>
				</div>
			) : status === "authenticated" && session?.profile.role === "admin" ? (
				<div className="flex justify-center mt-5">
					<p className="text-xl font-semibold">You can see the content of this page, because you are an admin</p>
				</div>
			) : status === "unauthenticated" ? (
				<div className="flex justify-center mt-5">
					<p className="text-xl font-semibold">You should sign in as an admin to see the content of this page</p>
				</div>
			) : (
				<div className="flex justify-center mt-5">
					<p className="text-xl text-slate-500 font-semibold">Loading...</p>
				</div>
			)}
		</section>
	);
}

export default Admin;
