import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

function AnalyticsModal({ showAnalytics, setShowAnalytics, darkMode, analyticsData }) {
  if (!showAnalytics) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`${darkMode ? "bg-[#1A0F0A]" : "bg-white"} w-[800px] max-h-[85vh] overflow-y-auto rounded-3xl p-8 shadow-2xl`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
              Analytics
            </h2>
            <p className={`mt-1 ${darkMode ? "text-[#F0A055]/70" : "text-gray-500"}`}>
              Last 7 days overview
            </p>
          </div>
          <button
            onClick={() => setShowAnalytics(false)}
            className={`w-10 h-10 rounded-full font-bold ${darkMode ? "bg-[#F0A055]/20 text-[#F0A055]" : "bg-gray-100 text-gray-600"}`}
          >
            ×
          </button>
        </div>

        {/* OCCUPANCY OVER TIME */}
        <div className={`rounded-3xl p-6 mb-6 ${darkMode ? "bg-[#F0A055]/5 border border-[#F0A055]/20" : "bg-gray-50"}`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
            Occupancy % Over Time
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analyticsData}>
              <XAxis 
                dataKey="timestamp" 
                stroke={darkMode ? "#F0A055" : "#4A6666"} 
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              />
              <YAxis stroke={darkMode ? "#F0A055" : "#4A6666"} tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ background: darkMode ? "#1A0F0A" : "white", border: "none", borderRadius: "12px" }}
                formatter={(value) => [`${value}%`, "Occupancy"]}
                labelFormatter={(val) => new Date(val).toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="occupancy"
                stroke={darkMode ? "#F0A055" : "#4A6666"}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PEAK HOURS */}
        <div className={`rounded-3xl p-6 mb-6 ${darkMode ? "bg-[#F0A055]/5 border border-[#F0A055]/20" : "bg-gray-50"}`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
            Peak Hours
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={
              Array.from({ length: 24 }, (_, i) => ({
                hour: `${i}:00`,
                count: analyticsData.filter(d => d.hour === i).length
              }))
            }>
              <XAxis dataKey="hour" stroke={darkMode ? "#F0A055" : "#4A6666"} tick={{ fontSize: 10 }} />
              <YAxis stroke={darkMode ? "#F0A055" : "#4A6666"} tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ background: darkMode ? "#1A0F0A" : "white", border: "none", borderRadius: "12px" }}
                formatter={(value) => [value, "Entries"]}
              />
              <Bar dataKey="count" fill={darkMode ? "#F0A055" : "#4A6666"} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TOTAL VEHICLES PER DAY */}
        <div className={`rounded-3xl p-6 ${darkMode ? "bg-[#F0A055]/5 border border-[#F0A055]/20" : "bg-gray-50"}`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
            Total Vehicles Per Day
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={
              [...new Set(analyticsData.map(d => d.date))].map(date => ({
                date,
                vehicles: analyticsData.filter(d => d.date === date && d.occupied > 0).length
              }))
            }>
              <XAxis dataKey="date" stroke={darkMode ? "#F0A055" : "#4A6666"} tick={{ fontSize: 11 }} />
              <YAxis stroke={darkMode ? "#F0A055" : "#4A6666"} tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ background: darkMode ? "#1A0F0A" : "white", border: "none", borderRadius: "12px" }}
                formatter={(value) => [value, "Vehicles"]}
              />
              <Bar dataKey="vehicles" fill={darkMode ? "#C4622D" : "#7A9A9A"} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </motion.div>
    </div>
  );
}

export default AnalyticsModal;