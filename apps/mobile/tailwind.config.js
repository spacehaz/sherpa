/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background:   'rgb(var(--color-background) / <alpha-value>)',
        surface:      'rgb(var(--color-surface) / <alpha-value>)',
        border:       'rgb(var(--color-border) / <alpha-value>)',
        primary:      'rgb(var(--color-primary) / <alpha-value>)',
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
        text:         'rgb(var(--color-text) / <alpha-value>)',
        muted:        'rgb(var(--color-muted) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}