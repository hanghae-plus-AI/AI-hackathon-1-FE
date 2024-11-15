/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        border: 'var(--border)',
        dropdown: 'var(--dropdown)',
        input: 'var(--input)',
        switch: 'var(--switch)',
        select: 'var(--select)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        tertiary: {
          DEFAULT: 'var(--tertiary)',
          foreground: 'var(--tertiary-foreground)'
        },
        quaternary: {
          DEFAULT: 'var(--quaternary)',
          foreground: 'var(--quaternary-foreground)'
        },
        quinary: {
          DEFAULT: 'var(--quinary)',
          foreground: 'var(--quinary-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        notice: {
          DEFAULT: 'var(--notice)',
          foreground: 'var(--notice-foreground)',
          border: 'var(--notice-border)'
        },
        main: 'var(--main)',
        sub: {
          indigo: 'var(--sub-indigo)',
          blue: 'var(--sub-blue)',
          gray: 'var(--sub-gray)'
        },
        light: {
          50: 'var(--light-50)',
          100: 'var(--light-100)'
        },
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)'
        },
        line: {
          50: 'var(--line-50)',
          100: 'var(--line-100)',
          200: 'var(--line-200)'
        },
        footer: 'var(--footer)',
        link: {
          active: 'var(--link-active)'
        }
      },
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
        PretendardMedium: ['Pretendard-Medium', 'sans-serif'],
        PretendardSemiBold: ['Pretendard-SemiBold', 'sans-serif'],
        PretendardBold: ['Pretendard-Bold', 'sans-serif'],
        PretendardExtraBold: ['Pretendard-ExtraBold', 'sans-serif']
      },
      screens: {
        ...defaultTheme.screens,
        md: '950px',
        xl: '1100px',
        pc: '1200px',
        '2xl': '1600px'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
