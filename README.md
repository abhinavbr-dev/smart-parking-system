# 🅿️ Smart Parking System

A real-time smart parking management system built with React and Firebase, featuring live sensor integration, slot booking, analytics, and an AI assistant.

🔗 **Live Demo:** https://smart-parking-system-ten-omega.vercel.app/

---

## 🚀 Features

- 📡 **Real-time slot monitoring** via ESP32 sensors and Firebase Realtime Database
- 🅿️ **Slot booking system** with vehicle registration
- 📊 **Analytics dashboard** with occupancy trends and peak hour charts
- 🔐 **Admin panel** protected by Firebase Authentication
- 🤖 **VIKI Assistant** — AI-powered parking guide
- 🎮 **Tic Tac Toe** mini game
- 🌙 **Dark mode** support
- ⚡ **CI/CD pipeline** with GitHub Actions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Firebase Realtime Database |
| Auth | Firebase Authentication |
| Charts | Recharts |
| Animation | Framer Motion |
| IoT | ESP32 + Arduino |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

## 📁 Project Structure
src/
├── components/
│   ├── VikiAssistant.jsx
│   └── TicTacToe.jsx
├── modals/
│   ├── BookingModal.jsx
│   ├── AnalyticsModal.jsx
│   ├── AdminLoginModal.jsx
│   ├── AdminModal.jsx
│   └── AboutModal.jsx
├── firebase/
│   └── config.js
└── App.jsx

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/abhinavbr-dev/smart-parking-system.git

# Install dependencies
cd smart-parking-system
npm install

# Start development server
npm run dev
```

---

## 🔧 Environment

Create a Firebase project and update `src/firebase/config.js` with your credentials.

---

## 📡 Hardware

- ESP32 microcontroller
- IR/Ultrasonic sensors per parking slot
- Sensors push data to Firebase Realtime Database

---

## 👤 Author

**Abhinav BR**
- GitHub: [@abhinavbr-dev](https://github.com/abhinavbr-dev)

---

## 📄 License

MIT License
