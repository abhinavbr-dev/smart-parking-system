import { motion } from "framer-motion";
import { ref, set } from "firebase/database";
import { db } from "../firebase/config";
import loadRazorpay from "../utils/loadRazorpay";

function BookingModal({
  showBooking,
  setShowBooking,
  darkMode,
  bookingData,
  setBookingData,
  availableSlots,
}) {
  if (!showBooking) return null;

  return (
    <>
      {showBooking && (

<div className="
  fixed
  inset-0
  bg-black/40
  flex
  items-center
  justify-center
  z-50
">

  <motion.div

    initial={{
      opacity: 0,
      scale: 0.9,
    }}

    animate={{
      opacity: 1,
      scale: 1,
    }}

    transition={{
      duration: 0.3,
    }}

    className={`
  ${darkMode ? "bg-[#1A0F0A]" : "bg-white"}
  w-[450px]
  rounded-3xl
  p-8
  shadow-2xl
`}
  >

    {/* HEADER */}

    <div className="flex justify-between items-center mb-8">

      <div>

      <h2 className={`text-3xl font-bold ${darkMode ? "text-[#F0A055]" : "text-[#4A6666]"}`}>
  Slot Booking
</h2>

<p className={`mt-1 ${darkMode ? "text-[#F0A055]/70" : "text-gray-500"}`}>
  Reserve your preferred parking slot
</p>

      </div>

      <button
  onClick={() => setShowBooking(false)}
  className={`w-10 h-10 rounded-full font-bold ${darkMode ? "bg-[#F0A055]/20 text-[#F0A055]" : "bg-gray-100 text-gray-600"}`}
>
  ×
</button>

    </div>

    {/* VEHICLE NUMBER */}

<div className="mb-6">

<label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-[#F0A055]" : "text-gray-600"}`}>
  Vehicle Number
</label>

<input
  type="text"
  placeholder="KL 11 AB 1234"
  value={bookingData.vehicle}
  onChange={(e) =>
    setBookingData({
      ...bookingData,
      vehicle: e.target.value,
    })
  }
  className={`w-full border rounded-2xl p-4 outline-none ${darkMode ? "bg-[#1A0F0A] border-[#F0A055]/40 text-[#F0A055] placeholder-[#F0A055]/40 focus:border-[#F0A055]" : "border-gray-300 focus:border-[#4A6666]"}`}
/>

</div>

   {/* SLOT SELECT */}

<div className="mb-8">

<label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-[#F0A055]" : "text-[gray-600]"}`}>
  Preferred Slot
</label>

<select
  value={bookingData.slot}
  onChange={(e) =>
    setBookingData({
      ...bookingData,
      slot: e.target.value,
    })
  }
  className={`w-full border rounded-2xl p-4 outline-none ${darkMode ? "bg-[#1A0F0A] border-[#F0A055]/40 text-[#F0A055] focus:border-[#F0A055]" : "border-gray-300 focus:border-[#4A6666]"}`}
>

  <option value="">
    Select Available Slot
  </option>

  {availableSlots.map((slot) => (

    <option
      key={slot.id}
      value={slot.id}
    >
      Slot {slot.id}
    </option>

  ))}

</select>

</div>

    {/* BOOK BUTTON */}

    <button

onClick={async () => {

  if (
    !bookingData.vehicle ||
    !bookingData.slot
  ) {
    alert("Please fill all fields");
    return;
  }

  const res = await loadRazorpay();

  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,

    amount: 5000,

    currency: "INR",

    name: "Smart Parking",

    description: `Slot ${bookingData.slot} Reservation`,

    handler: async function (response) {

      await set(
        ref(
          db,
          `bookings/slot${bookingData.slot}`
        ),
        {
          vehicle: bookingData.vehicle,
          slot: bookingData.slot,
          bookedAt: new Date().toLocaleTimeString(),
          paymentId:
            response.razorpay_payment_id,
        }
      );

      alert(
        "Payment Successful & Slot Reserved"
      );

      setBookingData({
        vehicle: "",
        slot: "",
      });

      setShowBooking(false);
    },

    prefill: {
      name: bookingData.vehicle,
    },

    theme: {
      color: "#4A6666",
    },
  };

  const paymentObject =
    new window.Razorpay(options);

  paymentObject.open();
}}

      className={`w-full ${darkMode ? "bg-[#F0A055] text-black" : "bg-[#4A6666] text-white"} py-4 rounded-2xl font-semibold hover:opacity-90 transition-all`}
    >
      Reserve Slot
    </button>

  </motion.div>

</div>

)}
    </>
  );
}

export default BookingModal;