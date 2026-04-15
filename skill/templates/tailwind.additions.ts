/**
 * Copia estas extensiones a tu tailwind.config.ts (bajo theme.extend):
 */
export const forjaTheme = {
  colors: {
    background: '#0a0a0b',
    surface: '#111113',
    elevated: '#17171a',
    border: { DEFAULT: '#26262b', bright: '#35353c' },
    foreground: '#f4f4f5',
    muted: '#a1a1aa',
    dim: '#8a8a94',
    ember: { DEFAULT: '#f59e0b', bright: '#fbbf24', deep: '#ef4444' },
    forge: '#f97316',
  },
  fontFamily: {
    display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
    sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'monospace'],
  },
  backgroundImage: {
    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  },
}
