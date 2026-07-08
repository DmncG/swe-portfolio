"use no memo";

import { motion } from "motion/react";
import type { SetStateAction, Dispatch } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import type { Theme } from "../../utils/customHooks/useTheme"

export type ThemeToggleProps = {
    theme: Theme,
    toggleTheme: Dispatch<SetStateAction<Theme>>
}

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {

    return (
        <button
          className={`w-8 h-4 ${theme === "dark" ? "bg-input-background": "bg-secondary-foreground"} rounded-full cursor-pointer flex ${theme === "light" ? "justify-start" : "justify-end"}`}
          onClick={() => {
            toggleTheme(theme === 'dark' ? 'light' : 'dark')
          }}
        >
            <motion.div
                className="w-4 h-4 bg-accent rounded-full"
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.3,
                    bounce: 0.5,
                }}
            >
                {
                    theme === "dark" ? (
                        <MdOutlineDarkMode 
                  className="w-[0.75rem] h-[0.75rem] relative top-[2px] left-[2.5px]"
                />
                    ) : (
                        <MdOutlineLightMode 
                  className="w-[0.75rem] h-[0.75rem] relative top-[2px] left-[2.5px] invert"
                />
                    )
                }
            </motion.div>
        </button>
    )
}