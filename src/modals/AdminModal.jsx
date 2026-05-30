import { motion } from "framer-motion";
import { ref, remove } from "firebase/database";
import { db, auth } from "../firebase/config";
import { signOut } from "firebase/auth";

function AdminModal({ showAdmin, setShowAdmin, darkMode, bookings }) {
  if (!showAdmin) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`${darkMode ? "bg-[#1A0F0A]" : "bg-[#4A6666]"} w-[600px] max-h-[80vh] overflow-y-auto rounded-3xl p-8 shadow-2xl`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? "text-[#F0A055]" : "text-white"}`}>
              Admin Dashboard
            </h2>
            <p className={`mt-1 ${darkMode ? "text-[#F0A055]/70" : "text-white"}`}>
              Active reservations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                await signOut(auth);
                setShowAdmin(false);
              }}
              className={`px-4 py-2 rounded-2xl font-semibold text-sm ${darkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-500"}`}
            >
              Logout
            </button>
            <button
              onClick={() => setShowAdmin(false)}
              className={`w-10 h-10 rounded-full font-bold ${darkMode ? "bg-[#F0A055]/20 text-[#F0A055]" : "bg-gray-100 text-gray-600"}`}
            >
              ×
            </button>
          </div>
        </div>

        {/* RESERVATIONS */}
        <div className="space-y-5">
          {bookings && Object.keys(bookings).length > 0 ? (
            Object.entries(bookings).map(([slotKey, booking]) => (
              <div
                key={slotKey}
                className={`border rounded-3xl p-6 ${darkMode ? "border-[#F0A055]/30 bg-[#F0A055]/5" : "border-gray-200"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-2xl font-bold ${darkMode ? "text-[#F0A055]" : "text-white"}`}>
                      {slotKey.toUpperCase()}
                    </h3>
                    <p className={`mt-2 ${darkMode ? "text-[#F0A055]/70" : "text-white/70"}`}>
                      Vehicle Number
                    </p>
                    <p className={`text-xl font-semibold mt-1 ${darkMode ? "text-[#F0A055]" : "text-white"}`}>
                      {booking.vehicle}
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      await remove(ref(db, `bookings/${slotKey}`));
                      alert("Vehicle Checked-In");
                    }}
                    className={`${darkMode ? "bg-[#F0A055] text-black" : "bg-white text-[#4A6666]"} px-5 py-3 rounded-2xl font-semibold`}
                  >
                    Check-In
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={`h-[250px] flex items-center justify-center border-2 border-dashed rounded-3xl ${darkMode ? "text-[#F0A055]/50 border-[#F0A055]/20" : "text-gray-400 border-gray-200"}`}>
              No active reservations
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}

export default AdminModal;