import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../lib/database/supabase";

export const authOptions = {
	// Configure one or more authentication providers
	// ...
	//NEXTAUTH_URL=https://real-time-chat-ten-wheat.vercel.app
	//NEXTAUTH_URL=http://localhost:3000
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
	],
	session: {
		strategy: "jwt",
	},

	callbacks: {
		async signIn({ user }) {
			if (user) {
				const { data, error } = await supabase.from("users").select("email").eq("email", user.email);
				if (data.length === 0 && !error) {
					const { error: insertError } = await supabase.from("users").insert({
						email: user.email,
						name: user.name,
						image: user.image,
					});
				} else if (error) {
					console.error("Error fetching user:", error);
				}
			}
			return true;
		},
		async jwt({ token, user }) {
			return token;
		},
		pages: {
			signIn: process.env.NEXTAUTH_URL + "/api/auth/signin",
			signOut: process.env.NEXTAUTH_URL + "/api/auth/signout",
			error: process.env.NEXTAUTH_URL + "/api/auth/error", // Error code passed in query string as ?error=
			verifyRequest: process.env.NEXTAUTH_URL + "/api/auth/verify-request", // (used for check email message)
			newUser: process.env.NEXTAUTH_URL + "/api/auth/new-user", // If set, new users will be directed here on first sign in
		},
	},
	pages: {
		signIn: process.env.NEXTAUTH_URL + "/api/auth/signin",
		signOut: process.env.NEXTAUTH_URL + "/api/auth/signout",
		error: process.env.NEXTAUTH_URL + "/api/auth/error", // Error code passed in query string as ?error=
		// verifyRequest: process.env.NEXTAUTH_URL + "/api/auth/verify-request", // (used for check email message)
		// newUser: process.env.NEXTAUTH_URL + "/api/auth/new-user", // If set, new users will be directed here on first sign in
	},
};

export default NextAuth(authOptions);
