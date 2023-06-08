import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
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
		Auth0Provider({
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			issuer: process.env.AUTH0_ISSUER,
		}),
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log("user signIn : ", user);
			console.log("account signIn : ", account);
			console.log("profile signIn : ", profile);
			console.log("email signIn : ", email);
			console.log("credentials signIn : ", credentials);
			return true;
		},
		async jwt({ token, account, profile }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			console.log("Profile jwt : ", profile);
			console.log("Account jwt : ", account);
			console.log("token jwt : ", token);
			if (account) {
				token.accessToken = account.access_token;
				token.id = profile.id;
				token.profile = profile;
			}
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.profile = token.profile;

			return session;
		},
	},
});

export { handler as GET, handler as POST };
