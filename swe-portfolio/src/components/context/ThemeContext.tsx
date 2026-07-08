import { createContext } from "react";
import type { Theme } from "../../utils/customHooks/useTheme";

export const ThemeContext = createContext((window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') as Theme);