import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			transitionProperty: {
				multiple: 'width, height, backgroundColor, border-radius',
			},
		},
		fontFamily: {
			'protest-strike-regular': ['Protest Strike', 'sans-serif'],
			'chakra-petch': ['Chakra Petch', 'sans-serif'],
			michelangelo: ['Michelangelo', 'sans-serif'],
			'sf-trans-robotics': ['SF TransRobotics', 'sans-serif'],
			'number-font': ['Chakra Petch', 'sans-serif'],
			protest: ['Protest Strike', 'sans-serif'],
		},
	},
	daisyui: {
		themes: ['light', 'dark', 'luxury'],
	},
	plugins: [require('daisyui')],
};
export default config;
