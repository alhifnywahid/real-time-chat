import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../lib/database/supabase";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID || "",
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 60 * 3,
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
	},
};

export default NextAuth(authOptions);
