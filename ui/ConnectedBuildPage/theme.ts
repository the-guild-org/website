export const THEME = {
  font: {
    colors: {
      white: '#fff',
      light: '#919FB5',
      dim: '#4d6894',
    },
  },
  background: {
    color: '#0b0b17',
    colors: {
      dark: '#0b0b17',
      darker: '#0d1126',
    },
  },
  hero: {
    titleColor: '#fff',
    highlightColor: '#00eaff',
  },
  logo: {
    color: '#fff',
  },
  bar: {
    textColor: '#fff',
  },
};

export function useTheme<T>(picker: (theme: typeof THEME, props: T) => string) {
  return (props: T & { theme: typeof THEME }) => picker(props.theme, props);
}

export function useFontColor<T, K extends keyof typeof THEME['font']['colors']>(
  color: K,
) {
  return (props: T & { theme: typeof THEME }) => props.theme.font.colors[color];
}
