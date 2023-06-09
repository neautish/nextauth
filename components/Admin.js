"use client";

import { useSession } from "next-auth/react";

function Admin() {
	const { data: session, status } = useSession();

	return (
		<section>
			{status === "authenticated" && session?.profile.role === "user" ? (
				<>
					<p>You don't have permission to access this page.</p>
				</>
			) : status === "authenticated" && session?.profile.role === "admin" ? (
				<>
					<p>You can see the content</p>
				</>
			) : (
				<>
					<p>You are not authenticated</p>
				</>
			)}
		</section>
	);
}

export default Admin;
