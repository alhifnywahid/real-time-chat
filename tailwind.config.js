/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern': "url('https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png')",
      }
    },
  },
  plugins: [],
};
