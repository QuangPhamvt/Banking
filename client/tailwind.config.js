const withMT = require("@material-tailwind/react/utils/withMT")

export default withMT({
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
		"path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#134067",
			},
			fontFamily: {
				dancing: "Merriweather",
				nunito: "Nunito Sans",
				sans: ["Nunito Sans"],
			},
		},
	},
	plugins: [],
})
