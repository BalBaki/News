/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                disappear: {
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            animation: {
                disappear: 'disappear 0.5s normal',
            },
        },
    },
    plugins: [],
};
