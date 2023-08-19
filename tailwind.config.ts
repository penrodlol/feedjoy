import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/ui/**/*.tsx', './src/app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font)', ...fontFamily.sans] },
      fontSize: { xxs: '12px' },
      backgroundColor: { 1: colors.neutral[950], 2: colors.neutral[800] },
      textColor: { 1: colors.neutral[400], 2: colors.neutral[500] },
      colors: { emphasis: colors.neutral[200] },
      borderColor: { DEFAULT: colors.neutral[800] },
      ringColor: { DEFAULT: colors.neutral[800] },
      spacing: {
        'fluid-1': 'clamp(0.25rem, calc(-0.09rem + 1.71vw), 1.13rem)',
        'fluid-2': 'clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem)',
        'fluid-3': 'clamp(0.75rem, calc(0.16rem + 2.93vw), 2.25rem)',
        'fluid-4': 'clamp(1rem, calc(0.22rem + 3.9vw), 3rem)',
        'fluid-5': 'clamp(1.5rem, calc(0.33rem + 5.85vw), 4.5rem)',
        'fluid-6': 'clamp(2rem, calc(0.44rem + 7.8vw), 6rem)',
        'fluid-7': 'clamp(3rem, calc(0.66rem + 11.71vw), 9rem)',
      },
      backgroundImage: {
        grid: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgPHBhdGggZD0iTTk2LDk1aDR2MUg5NnY0SDk1Vjk2SDg2djRIODVWOTZINzZ2NEg3NVY5Nkg2NnY0SDY1Vjk2SDU2djRINTVWOTZINDZ2NEg0NVY5NkgzNnY0SDM1Vjk2SDI2djRIMjVWOTZIMTZ2NEgxNVY5NkgwVjk1SDE1Vjg2SDBWODVIMTVWNzZIMFY3NUgxNVY2NkgwVjY1SDE1VjU2SDBWNTVIMTVWNDZIMFY0NUgxNVYzNkgwVjM1SDE1VjI2SDBWMjVIMTVWMTZIMFYxNUgxNVYwaDFWMTVoOVYwaDFWMTVoOVYwaDFWMTVoOVYwaDFWMTVoOVYwaDFWMTVoOVYwaDFWMTVoOVYwaDFWMTVoOVYwaDFWMTVoOVYwaDFWMTVoNHYxSDk2djloNHYxSDk2djloNHYxSDk2djloNHYxSDk2djloNHYxSDk2djloNHYxSDk2djloNHYxSDk2djloNHYxSDk2Wm0tMSwwVjg2SDg2djlaTTg1LDk1Vjg2SDc2djlaTTc1LDk1Vjg2SDY2djlaTTY1LDk1Vjg2SDU2djlaTTU1LDk1Vjg2SDQ2djlaTTQ1LDk1Vjg2SDM2djlaTTM1LDk1Vjg2SDI2djlaTTI1LDk1Vjg2SDE2djlaTTE2LDg1aDlWNzZIMTZabTEwLDBoOVY3NkgyNlptMTAsMGg5Vjc2SDM2Wm0xMCwwaDlWNzZINDZabTEwLDBoOVY3Nkg1NlptMTAsMGg5Vjc2SDY2Wm0xMCwwaDlWNzZINzZabTEwLDBoOVY3Nkg4NlptOS0xMFY2Nkg4NnY5Wk04NSw3NVY2Nkg3NnY5Wk03NSw3NVY2Nkg2NnY5Wk02NSw3NVY2Nkg1NnY5Wk01NSw3NVY2Nkg0NnY5Wk00NSw3NVY2NkgzNnY5Wk0zNSw3NVY2NkgyNnY5Wk0yNSw3NVY2NkgxNnY5Wk0xNiw2NWg5VjU2SDE2Wm0xMCwwaDlWNTZIMjZabTEwLDBoOVY1NkgzNlptMTAsMGg5VjU2SDQ2Wm0xMCwwaDlWNTZINTZabTEwLDBoOVY1Nkg2NlptMTAsMGg5VjU2SDc2Wm0xMCwwaDlWNTZIODZabTktMTBWNDZIODZ2OVpNODUsNTVWNDZINzZ2OVpNNzUsNTVWNDZINjZ2OVpNNjUsNTVWNDZINTZ2OVpNNTUsNTVWNDZINDZ2OVpNNDUsNTVWNDZIMzZ2OVpNMzUsNTVWNDZIMjZ2OVpNMjUsNTVWNDZIMTZ2OVpNMTYsNDVoOVYzNkgxNlptMTAsMGg5VjM2SDI2Wm0xMCwwaDlWMzZIMzZabTEwLDBoOVYzNkg0NlptMTAsMGg5VjM2SDU2Wm0xMCwwaDlWMzZINjZabTEwLDBoOVYzNkg3NlptMTAsMGg5VjM2SDg2Wm05LTEwVjI2SDg2djlaTTg1LDM1VjI2SDc2djlaTTc1LDM1VjI2SDY2djlaTTY1LDM1VjI2SDU2djlaTTU1LDM1VjI2SDQ2djlaTTQ1LDM1VjI2SDM2djlaTTM1LDM1VjI2SDI2djlaTTI1LDM1VjI2SDE2djlaTTE2LDI1aDlWMTZIMTZabTEwLDBoOVYxNkgyNlptMTAsMGg5VjE2SDM2Wm0xMCwwaDlWMTZINDZabTEwLDBoOVYxNkg1NlptMTAsMGg5VjE2SDY2Wm0xMCwwaDlWMTZINzZabTEwLDBoOVYxNkg4NloiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjIiLz4KICA8cGF0aCBkPSJNNiw1VjBINVY1SDBWNkg1djk0SDZWNmg5NFY1WiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA3NSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=")',
        gradient: `radial-gradient(at left top, ${colors.neutral[400]}, 50px, ${colors.neutral[700]} 50%)`,
      },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-fluid-type'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-fancy': {
          color: 'transparent',
          textShadow: '-1px -1px 0 hsla(0,0%,100%,.1), 1px 1px 0 rgba(0,0,0,.1)',
          '-webkit-text-stroke': '0.9px #ffffff75',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    }),
  ],
} satisfies Config;
