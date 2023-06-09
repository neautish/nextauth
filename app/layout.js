import Provider from "@components/Provider";
import Footer from "@components/Footer";
import Nav from "@components/Nav";

import "@styles/globals.css";

export const metadata = {
	title: "Next Auth",
	description: "A NextAuth project for working with different providers and do authentication for different pages",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="max-w-6xl mx-auto px-2">
				<Provider>
					<Nav />
					<main className="min-h-[250px] p-5 bg-green-50 rounded-lg">{children}</main>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
