import { useEffect, useState } from "react";
import { db } from "./firebase/config";
import AboutModal from "./modals/AboutModal";
import TicTacToeGame from "./components/TicTacToe";
import VikiAssistant from "./components/VikiAssistant";
import BookingModal from "./modals/BookingModal";
import AnalyticsModal from "./modals/AnalyticsModal";
import AdminLoginModal from "./modals/AdminLoginModal";
import AdminModal from "./modals/AdminModal";
import { ref, onValue, set, remove } from "firebase/database";
import {
  Gamepad2,
  UserCog,
  LayoutDashboard,
  ParkingCircle,
  BarChart3,
  Info,
  CarFront,
  CircleParking,
} from "lucide-react";

import { motion } from "framer-motion";

function App() {

  const [slots, setSlots] = useState({
    slot1: 0,
    slot2: 0,
    slot3: 0,
  });

const [showBooking, setShowBooking] = useState(false);

const [showAnalytics, setShowAnalytics] = useState(false);

const [analyticsData, setAnalyticsData] = useState([]);

const [showAdmin, setShowAdmin] = useState(false);

const [showAdminLogin, setShowAdminLogin] = useState(false);

const [showAbout, setShowAbout] = useState(false);

const [showTicTacToe, setShowTicTacToe] = useState(false);

const [adminPassword, setAdminPassword] = useState("");

const [bookingData, setBookingData] = useState({
  vehicle: "",
  slot: "",
});

const [bookings, setBookings] = useState({});

  useEffect(() => {

    const parkingRef = ref(db, "parking");

    onValue(parkingRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {
        setSlots(data);
        if (data) {
          setSlots(data);
          
          // SAVE ANALYTICS
          const occupiedCount = Object.values(data).filter(v => v === 1).length;
          const total = Object.keys(data).length;
          const occupancyPercent = Math.round((occupiedCount / total) * 100);
          
          set(ref(db, `analytics/${Date.now()}`), {
            occupancy: occupancyPercent,
            occupied: occupiedCount,
            timestamp: new Date().toISOString(),
            hour: new Date().getHours(),
            date: new Date().toLocaleDateString("en-GB"),
          });
        }
      }

    });

  }, []);

  useEffect(() => {

    const bookingRef = ref(db, "bookings");
  
    onValue(bookingRef, (snapshot) => {
  
      const data = snapshot.val();
  
      if (data) {
  
        setBookings(data);
  
      } else {
  
        setBookings({});
  
      }
  
    });
  
  }, []);

  useEffect(() => {
    const analyticsRef = ref(db, "analytics");
    onValue(analyticsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.values(data)
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .slice(-168);
        setAnalyticsData(entries);
      }
    });
  }, []);

  // LIVE SLOTS

  const liveSlots = [

    {
      id: 1,
      occupied: slots.slot1 === 1,
      reserved: bookings.slot1,
      live: true,
    },
  
    {
      id: 2,
      occupied: slots.slot2 === 1,
      reserved: bookings.slot2,
      live: true,
    },
  
    {
      id: 3,
      occupied: slots.slot3 === 1,
      reserved: bookings.slot3,
      live: true,
    },
  
  ];

  // DEMO SLOTS

  const demoSlots = [

    { id: 4, occupied: false, reserved: bookings.slot4 },
  
    { id: 5, occupied: true, reserved: bookings.slot5 },
  
    { id: 6, occupied: true, reserved: bookings.slot6 },
  
    { id: 7, occupied: false, reserved: bookings.slot7 },
  
    { id: 8, occupied: true, reserved: bookings.slot8 },
  
    { id: 9, occupied: false, reserved: bookings.slot9 },
  
    { id: 10, occupied: true, reserved: bookings.slot10 },
  
    { id: 11, occupied: false, reserved: bookings.slot11 },
  
    { id: 12, occupied: true, reserved: bookings.slot12 },
  
    { id: 13, occupied: true, reserved: bookings.slot13 },
  
    { id: 14, occupied: false, reserved: bookings.slot14 },
  
    { id: 15, occupied: true, reserved: bookings.slot15 },
  
  ];

  const parkingSlots = [...liveSlots, ...demoSlots];
  const availableSlots = parkingSlots.filter(
    (slot) =>
      !slot.occupied &&
      !slot.reserved
  );

  const occupiedCount = parkingSlots.filter(
    (slot) => slot.occupied
  ).length;

  const availableCount = parkingSlots.filter(
    (slot) =>
      !slot.occupied &&
      !slot.reserved
  ).length;

  const occupancy =
    Math.round(
      (occupiedCount / parkingSlots.length) * 100
    );

    const recommendedSlot =
  parkingSlots.find(
    (slot) =>
      !slot.occupied &&
      !slot.reserved &&
      slot.live
  );

  const [darkMode, setDarkMode] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (

    <div className="h-screen flex overflow-hidden relative">
   {/* FIXED BACKGROUND */}
<div
  style={{
    backgroundImage: darkMode ? "url('/car2.jpg')" : "url('/car.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  className="fixed inset-0 z-0"
/>

 

      {/* SIDEBAR */}

      <div className={`
  text-white
  flex
  flex-col
  justify-between
  transition-all
  duration-300
  h-screen
  sticky
  top-0
  overflow-hidden
  relative
  z-10

  ${sidebarOpen
    ? "w-[260px]"
    : "w-[90px]"}

    ${darkMode ? "bg-[#1A0F0A]" : "bg-[#4A6666]"}
`}>

        <div>

          {/* LOGO */}

          <div className="p-7 border-b border-white/10">
          <div className="flex justify-end mb-4">

<button

  onClick={() =>
    setSidebarOpen(!sidebarOpen)
  }

  className="
    bg-white/10
    hover:bg-white/20
    transition-all
    p-2
    rounded-xl
  "
>

  {sidebarOpen ? "←" : "→"}

</button>

</div>

            <div className="flex items-center gap-4">

            <div className={`${darkMode ? "bg-[#C4622D] text-white" : "bg-white text-[#4A6666]"} p-3 rounded-xl`}>
  <ParkingCircle size={30} />
</div>

              {sidebarOpen && (

<div>

<h1 className={`text-3xl font-bold ${darkMode ? "text-[#F0A055]" : "text-white"}`}>
  Smart Parking
</h1>

</div>

)}

            </div>

          </div>

          {/* MENU */}

          <div className={`p-4 flex flex-col gap-2 mt-4 ${darkMode ? "text-[#F0A055]" : "text-white"}`}>

          <div className={`${darkMode ? "bg-[#F0A055]/15" : "bg-white/15"} rounded-2xl p-4 flex items-center gap-4 cursor-pointer`}>
              <LayoutDashboard />
              {sidebarOpen && (

<span className="font-semibold">
  Dashboard
</span>

)}
            </div>

            <div

  onClick={() => setShowBooking(true)}

  className={`
  hover:bg-white/10
  rounded-2xl
  p-4
  flex
  items-center
  cursor-pointer
  transition-all

  ${sidebarOpen
    ? "gap-4"
    : "justify-center"}
`}
>

  <ParkingCircle />

  {sidebarOpen && (

<span className="font-semibold">
  Slot Booking
</span>

)}

</div>

<div
  onClick={() => setShowAnalytics(true)}
  className={`
  hover:bg-white/10
  rounded-2xl
  p-4
  flex
  items-center
  cursor-pointer
  transition-all

  ${sidebarOpen
    ? "gap-4"
    : "justify-center"}
`}>
  <BarChart3 />
  {sidebarOpen && (
    <span className="font-semibold">
      Analytics
    </span>
  )}
</div>

            

<div
  onClick={() => setShowTicTacToe(true)}
  className={`
    hover:bg-white/10
    rounded-2xl
    p-4
    flex
    items-center
    cursor-pointer
    transition-all
    ${sidebarOpen ? "gap-4" : "justify-center"}
  `}
>
  <Gamepad2 />
  {sidebarOpen && <span className="font-semibold">Play with VIKI</span>}
</div>

            <div
  onClick={() => setShowAbout(true)}
  className={`
    hover:bg-white/10
    rounded-2xl
    p-4
    flex
    items-center
    cursor-pointer
    transition-all
    ${sidebarOpen ? "gap-4" : "justify-center"}
  `}
>
  <Info />
  {sidebarOpen && <span className="font-semibold">About</span>}
</div>

            <div

onClick={() => setShowAdminLogin(true)}

  className="
    hover:bg-white/10
    rounded-2xl
    p-4
    flex
    items-center
    gap-4
    cursor-pointer
    transition-all
  "
>

  <UserCog />

  {sidebarOpen && (

<span className="font-semibold">
  Admin
</span>
)}

</div>

      </div>

      </div>
      </div>

      {/* MAIN CONTENT */}

<div
  className={`
    flex-1
    p-8
    transition-all
    relative
    z-10
    overflow-y-auto

    ${darkMode
      ? "text-white"
      : "text-black"}
  `}
>


        {/* TOP BAR */}

        <div className="flex justify-between items-center mb-10 relative z-20">

        <div>

<h1 className={`
  text-3xl
  font-bold

  ${darkMode
    ? "text-black"
    : "text-white"}
`}>
  Dashboard
</h1>

</div>

          <div className="flex items-center gap-8 text-gray-600">

          <div className={`${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
  {new Date().toLocaleDateString("en-GB")}
</div>

<div className={`${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
  {new Date().toLocaleTimeString()}
</div>

          <button

onClick={() => setDarkMode(!darkMode)}

className={`
  px-5
  py-2
  rounded-2xl
  font-semibold
  transition-all

  ${darkMode
    ? "bg-[#F0A055] text-black"
    : "bg-[#4A6666] text-white"}
`}
>

{darkMode ? "☀️" : "🌙"}

</button>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FFC300] rounded-full"></div>
              <span className={`font-semibold ${darkMode ? "text-[#F0A055]" : ""}`}>
  Live
</span>
            </div>

            

          </div>

        </div>

        {/* COMPACT STATUS BAR */}

        <div className={`
  rounded-3xl
  shadow-sm
  p-6
  flex
  flex-wrap
  gap-10
  mb-10
  transition-all

  ${darkMode
    ? "bg-[#1A0F0A]/80"
    : "bg-[#AECECE]/40"}
`}>

          <div>

            <p className="text-black-500">
              Total Slots
            </p>

            <h2 className={`text-4xl font-bold ${darkMode ? "text-[#F0A055]" : "text-black"}`}>
              {parkingSlots.length}
            </h2>

          </div>

          <div>

            <p className="text-black-500">
              Occupied
            </p>

            <h2 className="text-4xl font-bold text-red-500">
              {occupiedCount}
            </h2>

          </div>

          <div>

            <p className="text-black-500">
              Available
            </p>

            <h2 className="text-4xl font-bold text-green-500">
              {availableCount}
            </h2>

          </div>

          <div>

            <p className="text-black-500">
              Occupancy
            </p>

            <h2 className={`text-4xl font-bold ${darkMode ? "text-[#F0A055]" : "text-black"}`}>
              {occupancy}%
            </h2>

          </div>

        </div>

        {/* PARKING HEADER */}

        <div className="flex justify-between items-center mb-6">

        </div>

        {/* PARKING GRID */}

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3 relative z-20">

          {parkingSlots.map((slot) => (

            <motion.div
              whileHover={{ scale: 1.03 }}
              key={slot.id}
              className={`
  rounded-3xl
  shadow-sm
  p-6
  border
  transition-all

  ${darkMode
    ? "bg-[#1A0F0A]/60 border-[#F0A055]/20"
    : "bg-white/50 border-gray-100"}
`}
            >

              <div className="flex justify-between items-center mb-5">

              <h2 className={`
  text-2xl
  font-bold

  ${darkMode
    ? "text-white"
    : "text-black"}
`}>
                  Slot {slot.id}
                </h2>

                <div className={`
                  px-4 py-1 rounded-full text-sm font-semibold
                  ${slot.occupied
                    ? "bg-red-100 text-red-500"
                    : slot.reserved
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"}
                `}>

{slot.occupied
  ? "Occupied"
  : slot.reserved
  ? "Reserved"
  : "Available"}

                </div>

              </div>

              {/* PARKING VISUAL */}

              <div className={`
                h-[220px]
                rounded-2xl
                border-2
                flex
                items-center
                justify-center
                relative
                overflow-hidden
                ${slot.occupied
                  ? darkMode
                    ? "border-red-500 bg-red-500/10"
                    : "border-red-400"
                  : darkMode
                    ? "border-green-500 bg-green-500/5 border-dashed"
                    : "border-green-400 border-dashed"}
              `}>

                {slot.occupied ? (

                  <CarFront
                    size={110}
                    className="text-red-500"
                  />

                ) : (

                  <CircleParking
                    size={90}
                    className="text-green-500 opacity-50"
                  />

                )}

              </div>

              <div className={`
  mt-4
  text-center
  text-sm

  ${darkMode
    ? "text-gray-400"
    : "text-gray-500"}
`}>

                {slot.live
                  ? "Live Sensor Slot"
                  : "Demo Slot"}

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      <VikiAssistant
  darkMode={darkMode}
  recommendedSlot={recommendedSlot}
/>

<AnalyticsModal
  showAnalytics={showAnalytics}
  setShowAnalytics={setShowAnalytics}
  darkMode={darkMode}
  analyticsData={analyticsData}
/>

<BookingModal
  showBooking={showBooking}
  setShowBooking={setShowBooking}
  darkMode={darkMode}
  bookingData={bookingData}
  setBookingData={setBookingData}
  availableSlots={availableSlots}
/>

<AdminLoginModal
  showAdminLogin={showAdminLogin}
  setShowAdminLogin={setShowAdminLogin}
  darkMode={darkMode}
  adminPassword={adminPassword}
  setAdminPassword={setAdminPassword}
  setShowAdmin={setShowAdmin}
/>

<AdminModal
  showAdmin={showAdmin}
  setShowAdmin={setShowAdmin}
  darkMode={darkMode}
  bookings={bookings}
/>

<AboutModal
  showAbout={showAbout}
  setShowAbout={setShowAbout}
  darkMode={darkMode}
/>

{showTicTacToe && (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]"
    onClick={() => setShowTicTacToe(false)}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
      className={`${darkMode ? "bg-[#1A0F0A]" : "bg-white"} w-[420px] max-w-[92vw] rounded-3xl p-6 shadow-2xl`}
    >
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className={`text-3xl font-bold ${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
            Play with VIKI
          </h2>
          <p className={`mt-2 text-sm ${darkMode ? "text-[#F0A055]/70" : "text-gray-500"}`}>
            Tic Tac Toe
          </p>
        </div>

        <button
          onClick={() => setShowTicTacToe(false)}
          className={`w-10 h-10 rounded-full font-bold ${
            darkMode ? "bg-[#F0A055]/20 text-[#F0A055]" : "bg-gray-100 text-gray-600"
          }`}
        >
          ×
        </button>
      </div>

      <TicTacToeGame darkMode={darkMode} />
    </motion.div>
  </div>
)}
    </div>

  );
}

export default App;