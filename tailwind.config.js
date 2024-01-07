/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
    theme: {
        extend: {
            keyframes: {
                disappear: {
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            animation: {
                disappear: 'disappear 0.5s normal',
                'spin-slow': 'spin 2s linear infinite',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
