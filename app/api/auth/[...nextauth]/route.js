import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";

import { connectToDB } from "@utils/database";
import User from "@models/user";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			try {
				await connectToDB();

				// check if user exists
				const userExists = await User.findOne({ email: profile.email });

				// if not, create one
				if (!userExists) {
					const createdUser = await User.create({
						email: profile.email,
						username: profile.name,
						image: profile.picture || profile.avatar_url || "",
						loginWith: [account.provider],
						role: "user",
					});
					profile.role = createdUser.role;
				}
				profile.role = userExists.role;

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		async jwt({ token, account, profile }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.id = profile.id;
				token.profile = profile;
				token.provider = account.provider;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.profile = token.profile;
			session.user.provider = token.provider;

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
