/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		animation: {
  			shimmer: 'shimmer 2.5s linear infinite',
  			glow: 'glow 2s ease-in-out infinite'
  		},
  		keyframes: {
  			shimmer: {
  				'0%': {
  					backgroundPosition: '0% center'
  				},
  				'100%': {
  					backgroundPosition: '200% center'
  				}
  			},
  			glow: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.5'
  				}
  			}
  		},
  		borderRadius: {
  			'3xl': '1.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundColor: {
  			glass: 'rgba(0, 0, 0, 0.7)'
  		},
  		borderColor: {
  			glass: {
  				DEFAULT: 'rgba(139, 92, 246, 0.2)',
  				hover: 'rgba(16, 185, 129, 0.2)'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
