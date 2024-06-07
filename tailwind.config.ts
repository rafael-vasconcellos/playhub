import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },

            animation: {
                emerge: 'emerge 1s ease-in-out',
                display: 'display 1s linear',
                scale: 'scale 0.5s ease-in-out',
            },
            backgroundPosition: {
                "y-center": '-40px 0px'
            },

            colors: {
                primary: "#F10303"
            }

        },
    },
  
    plugins: [],
}


export default config

/* 

npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
-i: input
-o: output

*/