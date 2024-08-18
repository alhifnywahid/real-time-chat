// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "../../lib/database/supabase";
export default async function handler(req, res) {
	const users = await supabase.from("users").select("*");
	res.status(200).json(users.data);
}
