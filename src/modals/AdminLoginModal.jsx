import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function AdminLoginModal({
  showAdminLogin,
  setShowAdminLogin,
  darkMode,
  adminEmail,
  setAdminEmail,
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
              Enter admin credentials
            </p>
          </div>
          <button
            onClick={() => setShowAdminLogin(false)}
            className={`w-10 h-10 rounded-full font-bold ${darkMode ? "bg-[#F0A055]/20 text-[#F0A055]" : "bg-gray-100 text-gray-600"}`}
          >
            ×
          </button>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-[#F0A055]" : "text-white"}`}>
            Email
          </label>
          <input
            type="email"
            placeholder="admin@smartparking.com"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className={`w-full border rounded-2xl p-4 outline-none ${darkMode ? "bg-[#1A0F0A] border-[#F0A055]/40 text-[#F0A055] placeholder-[#F0A055]/40 focus:border-[#F0A055]" : "border-gray-300 focus:border-white"}`}
          />
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
          onClick={async () => {
            try {
              await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
              setShowAdminLogin(false);
              setShowAdmin(true);
              setAdminEmail("");
              setAdminPassword("");
            } catch (error) {
              alert("Incorrect email or password");
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