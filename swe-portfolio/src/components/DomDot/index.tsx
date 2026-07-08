import { motion } from "motion/react";

export const DomDot = () => {
    return (
    <motion.div
      className="w-[4px] h-[4px] bg-dom-dot rounded-full cursor-pointer absolute top-[2.95rem] left-[2.52rem]"
      whileHover={{
        scale: 3,
        transition: {
            type: "spring",
            bounce: 0.5
        }
      }}
    />
    )
}