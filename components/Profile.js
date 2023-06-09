"use client";

import { useSession } from "next-auth/react";

function Profile() {
	const { data: session, status } = useSession();

	let userDetails = [];
	for (const item in session) {
		userDetails.push({
			name: item,
			content: session[item],
		});
	}

	return (
		<section>
			{status === "unauthenticated" ? (
				<div>
					<p>Your are not signed in. Sign In to see your profile.</p>
				</div>
			) : (
				<div>
					<div className="flex items-start justify-center gap-3 mb-20 mt-5">
						<div className="flex flex-col text-center">
							<span className="text-2xl font-bold">{session?.user.name}</span>
							<span className="text-base font-bold text-slate-500">{session?.user.email}</span>
						</div>
					</div>
					<div>
						<div className="mb-4">
							<p className="font-semibold">
								What <span className="text-blue-500 font-bold">{session?.user.provider}</span> give back after a successful Login:
							</p>
							<p className="text-sm font-semibold text-slate-500">(Try different providers to see what they give back to you.)</p>
						</div>
						<div className="flex flex-col gap-3">
							{userDetails.map((item) => (
								<div className="flex bg-slate-300 p-4 rounded-lg overflow-x-auto" key={item.name}>
									<span className="text-sm font-semibold">{item.name}:</span>
									<pre className="text-sm"> {JSON.stringify(item.content, null, 2)}</pre>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default Profile;
