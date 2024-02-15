/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            keyframes: {
                dropdownEffect: {
                    '0%': { transform: 'scaleY(0)' },
                },
                littleBounce: {
                    '0%, 100%': {
                        transform: 'translateY(-10%)',
                        'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                    '50%': { transform: 'none', 'animation-timing-function': 'cubic-bezier(0,0,0.2,1)' },
                },
                fadeIn: {
                    '0%': {
                        opacity: '0',
                    },
                },
                fadeOut: {
                    '100%': {
                        opacity: '0',
                    },
                },
                slidingFromRightToLeft: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(100%)',
                    },
                },
                slidingFromLeftToRight: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(-100%)',
                    },
                },
            },
            animation: {
                'spin-slow': 'spin 2s linear infinite',
                'spin-very-slow': 'spin 3s linear infinite',
                dropdown: 'dropdownEffect .150s linear',
                'little-bounce': 'littleBounce 1s infinite',
                'fade-in': 'fadeIn .5s linear',
                'fade-out': 'fadeOut .5s linear',
                'sliding-from-right-to-left': 'slidingFromRightToLeft .7s ease-in-out',
                'sliding-from-left-to-right': 'slidingFromLeftToRight .7s ease-in-out',
            },
            backgroundImage: {
                'news-bg': "url('/public/assets/images/news-bg.jpg')",
                'error-bg': "url('/public/assets/images/error-bg.jpg')",
            },
        },
    },
    plugins: [],
};
