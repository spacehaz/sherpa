import { createContext, useContext, useState } from 'react'
import { View } from 'react-native'
import { vars } from 'nativewind'
import { themes, ThemeName } from './themes'

type TContext = {
  theme: ThemeName
  toggle: () => void
}

const ThemeContext = createContext<TContext>({
  theme: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('light')

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <View style={[{ flex: 1 }, vars(themes[theme])]}>
        {children}
      </View>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
