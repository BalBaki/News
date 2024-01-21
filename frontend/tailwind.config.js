/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
    theme: {
        extend: {
            keyframes: {
                dropdownEffect: {
                    '0%': { transform: 'scaleY(0)' },
                },
            },
            animation: {
                'spin-slow': 'spin 2s linear infinite',
                'spin-very-slow': 'spin 3s linear infinite',
                dropdown: 'dropdownEffect .3s linear',
            },
            backgroundImage: {
                'news-bg': "url('/src/assets/images/news-bg.jpg')",
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
