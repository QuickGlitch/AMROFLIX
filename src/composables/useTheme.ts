import { ref, provide, inject, type InjectionKey, type Ref } from 'vue'

export type Theme = 'light' | 'dark'

export interface ThemeContext {
  theme: Ref<Theme>
  toggleTheme: () => void
}

export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme')

export function provideTheme(initialTheme: Theme = 'dark') {
  const theme = ref<Theme>(initialTheme)

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const context: ThemeContext = {
    theme,
    toggleTheme,
  }

  provide(ThemeKey, context)

  return context
}

export function useTheme(): ThemeContext {
  const context = inject(ThemeKey)

  if (!context) {
    throw new Error('theme context not provided')
  }

  return context
}
