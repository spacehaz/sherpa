export const themes = {
  light: {
    '--color-background':  '255 255 255',
    '--color-surface':     '249 250 251',
    '--color-border':      '229 231 235',
    '--color-primary':     '31 41 55',
    '--color-on-primary':  '255 255 255',
    '--color-text':        '17 24 39',
    '--color-muted':       '156 163 175',
  },
  dark: {
    '--color-background':  '17 24 39',
    '--color-surface':     '31 41 55',
    '--color-border':      '55 65 81',
    '--color-primary':     '255 255 255',
    '--color-on-primary':  '17 24 39',
    '--color-text':        '249 250 251',
    '--color-muted':       '107 114 128',
  },
} as const

export type ThemeName = keyof typeof themes
