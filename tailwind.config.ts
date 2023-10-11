import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#219653",
				secondary: "#27AE60",
				tertiary: "#6FCF97"
			},
			textColor: {
				primary: "#FFF",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			borderWidth: {
				"1": "1px"
			},
			width: {
				"8.5/10": "85%",
				"9/10": "90%"
			}
		},
	},
	plugins: [

	],
};
export default config;
