import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'roubit-point-color': '#55AB7B',
            },

            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    safelist: [
        'bg-roubit-point-color',
        'text-white',
        'bg-white',
        'text-[#55AB7B]',
        'border-[#55AB7B]-500',
        'text-gray-400',
        'bg-gray-200',
    ],
    plugins: [],
};
export default config;
