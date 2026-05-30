import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function AboutModal({
    showAbout,
    setShowAbout,
    darkMode,
  }) {
  
    if (!showAbout) return null;
  
    return (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]"
    onClick={() => setShowAbout(false)}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
      className={`${
        darkMode ? "bg-[#1A0F0A]" : "bg-white"
      } w-[520px] max-w-[90vw] rounded-3xl p-8 shadow-2xl`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className={`text-3xl font-bold ${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
            About Smart Parking
          </h2>
          <p className={`mt-2 text-sm ${darkMode ? "text-[#F0A055]/70" : "text-gray-500"}`}>
            Real-time parking management made simple
          </p>
        </div>

        <button
          onClick={() => setShowAbout(false)}
          className={`w-10 h-10 rounded-full font-bold ${
            darkMode ? "bg-[#F0A055]/20 text-[#F0A055]" : "bg-gray-100 text-gray-600"
          }`}
        >
          ×
        </button>
      </div>

      <p className={`leading-7 mb-6 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
        Smart Parking is a real-time parking dashboard that helps users monitor slot availability,
        reserve parking spaces, and track occupancy through live sensor data and analytics.
      </p>

      <div className="space-y-3 mb-6">
        {[
          "Live parking slot monitoring",
          "Slot booking and reservations",
          "Occupancy analytics and peak-hour insights",
          "Admin control for reservations",
          "VIKI AI assistant for smart guidance",
        ].map((item) => (
          <div
            key={item}
            className={`flex items-center gap-3 p-3 rounded-2xl ${
              darkMode ? "bg-white/5 text-white/80" : "bg-gray-50 text-gray-700"
            }`}
          >
            <Sparkles size={16} className="text-[#F0A055]" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div
        className={`text-sm rounded-2xl p-4 ${
          darkMode ? "bg-white/5 text-white/60" : "bg-gray-50 text-gray-600"
        }`}
      >
        Built with React, Firebase Realtime Database, Recharts, Framer Motion, and Lucide Icons.
      </div>
    </motion.div>
  </div>
  );
}
  export default AboutModal;