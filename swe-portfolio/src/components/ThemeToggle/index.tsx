import { useState } from "react";
import { motion } from "motion/react";

export const ThemeToggle = () => {
    const [themeSetting, setThemeSetting] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleThemeSetting = () => {
        setThemeSetting(!themeSetting)
    }

    console.log("themeSetting", themeSetting)
    return (
        <button
          className={`w-8 h-4 bg-white rounded-full cursor-pointer flex ${themeSetting ? "justify-start" : "justify-end"}`}
          onClick={toggleThemeSetting}
        >
            <motion.div
                className="w-3 h-3 bg-black rounded-full"
                layout
                transition={{
                    type: "spring",
                    visualDuration: 1,
                    bounce: 0.5,
                }}
            />
        </button>
    )
}