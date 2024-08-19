import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../lib/database/supabase";

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			profile(profile) { 
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email || null, // Email mungkin null
					image: profile.avatar_url,
				};
			},
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
			console.log(user);
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
	pages: {
		signIn: process.env.NEXTAUTH_URL + "/api/auth/signin",
		signOut: process.env.NEXTAUTH_URL + "/api/auth/signout",
		error: process.env.NEXTAUTH_URL + "/api/auth/error",
	},
	event: {
		async signIn({ user }) {
			console.log(user);
		},
	},
};

export default NextAuth(authOptions);
