/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				pattern: "url('https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png')",
			},
			keyframes: {
				mesh: {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},
			},
			animation: {
				mesh: "mesh 15s ease infinite",
			},
			backgroundSize: {
				"200%": "200% 200%",
			},
			colors: {
				darkGray: "#1f2937", // abu-abu gelap
				darkBlue: "#1e3a8a", // biru tua
				darkPurple: "#4c1d95", // ungu tua
				darkTeal: "#134e4a", // hijau tua
				darkIndigo: "#312e81", // biru indigo
			},
		},
	},
	plugins: [],
};
