import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				blue: '#1D8CE0',
  				violet: '#7D2AE8',
  				pink: '#FF4DB8',
  				background: '#FAFAFA',
  				text: '#1F2937'
  			}
  		},
  		boxShadow: {
  			premium: '0 24px 70px rgba(73, 48, 131, 0.14)'
  		},
  		backgroundImage: {
  			'brand-gradient': 'linear-gradient(135deg, #1D8CE0, #7D2AE8 52%, #FF4DB8)'
  		},
  		borderRadius: {
  			xl: '1rem',
  			'2xl': '1.5rem',
  			'3xl': '1.875rem'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: []
};

export default config;
