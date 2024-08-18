// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "../../lib/database/supabase";
export default async function handler(req, res) {
	if (req.method == "GET") {
		try {
			const chats = await supabase.from("chats").select("*");
			res.status(200).json(chats.data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method == "POST") {
		try {
			const chats = await supabase.from("chats").insert([req.body]).select();
			res.status(200).json(chats.data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
