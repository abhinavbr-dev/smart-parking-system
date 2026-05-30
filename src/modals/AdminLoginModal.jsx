import { motion } from "framer-motion";

function AdminLoginModal({
  showAdminLogin,
  setShowAdminLogin,
  darkMode,
  adminPassword,
  setAdminPassword,
  setShowAdmin,
}) {
  if (!showAdminLogin) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`${darkMode ? "bg-[#1A0F0A]" : "bg-[#4A6666]"} w-[400px] rounded-3xl p-8 shadow-2xl`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? "text-[#F0A055]" : "text-white"}`}>
              Admin Access
            </h2>
            <p className={`mt-1 ${darkMode ? "text-[#F0A055]/70" : "text-white"}`}>
              Enter admin password
            </p>
          </div>
          <button
            onClick={() => setShowAdminLogin(false)}
            className={`w-10 h-10 rounded-full font-bold ${darkMode ? "bg-[#F0A055]/20 text-[#F0A055]" : "bg-gray-100 text-gray-600"}`}
          >
            ×
          </button>
        </div>

        {/* PASSWORD */}
        <div className="mb-8">
          <label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-[#F0A055]" : "text-white"}`}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className={`w-full border rounded-2xl p-4 outline-none ${darkMode ? "bg-[#1A0F0A] border-[#F0A055]/40 text-[#F0A055] placeholder-[#F0A055]/40 focus:border-[#F0A055]" : "border-gray-300 focus:border-white"}`}
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={() => {
            if (adminPassword === "admin123") {
              setShowAdminLogin(false);
              setShowAdmin(true);
              setAdminPassword("");
            } else {
              alert("Incorrect Password");
            }
          }}
          className={`w-full ${darkMode ? "bg-[#F0A055] text-black" : "bg-white text-black"} py-4 rounded-2xl font-semibold hover:opacity-90 transition-all`}
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}

export default AdminLoginModal;