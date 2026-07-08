import type { Theme } from "../utils/customHooks/useTheme"

export const cssClassNames = (prefix: string) => {
    return (str: string) => {
        return `${prefix}--${str}`;
    }
}

export const isDarkTheme = (theme: Theme) => {
    return theme === "dark";
}

