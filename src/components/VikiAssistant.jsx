import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function VikiAssistant({ darkMode, recommendedSlot }) {

  const vikiMessages = [
    recommendedSlot
      ? `Best parking choice is Slot ${recommendedSlot.id}`
      : "Parking area is currently full",
    "I am here to help you find the best parking slot",
    "Real-time smart parking assistance active",
    "Monitoring parking availability live",
    "Tired of waiting for a slot? Play with VIKI.",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % vikiMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [vikiMessages.length]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: -6 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 12,
        },
      }}
      className={`
        fixed
        bottom-6
        right-6
        ${darkMode ? "bg-[#1A0F0A]" : "bg-[#4A6666]"}
        text-white
        p-3 md:p-4
        rounded-2xl
        shadow-xl
        cursor-pointer
        z-50
        w-[180px] md:w-[260px]
        will-change-transform
      `}
    >
      <div className="flex items-start gap-3 md:gap-4">

        {/* VIKI AI ICON */}
        <div className="min-w-[40px] h-[40px] md:min-w-[50px] md:h-[50px] rounded-2xl bg-white/10 flex items-center justify-center">
          <Sparkles
            size={20}
            className={`${darkMode ? "text-[#F0A055]" : "text-white"}`}
            strokeWidth={2.5}
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className={`font-bold text-lg md:text-2xl ${darkMode ? "text-[#F0A055]" : "text-white"}`}>
            VIKI
          </h2>

          <p className={`hidden md:block text-sm mb-3 ${darkMode ? "text-[#F0A055]/70" : "text-gray-400"}`}>
            Virtual Intelligence Kinetic Interface
          </p>

          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-xs md:text-sm leading-relaxed ${darkMode ? "text-[#F0A055]" : "text-white"}`}
          >
            {vikiMessages[messageIndex]}
          </motion.p>
        </div>

      </div>
    </motion.div>
  );
}

export default VikiAssistant;