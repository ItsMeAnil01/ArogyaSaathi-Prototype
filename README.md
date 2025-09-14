🌿 Arogya Saathi – Health Companion

Version 1.0 – Initial Prototype

A telemedicine platform designed to bridge the healthcare gap in rural and remote communities of Himachal Pradesh, empowering patients, ASHA workers, and doctors with reliable and low-bandwidth digital healthcare solutions.

📌 Problem Statement (SIH 2025)

Title: Telemedicine Access for Rural Healthcare
PS ID: SIH25018

Rural and remote areas face severe challenges in accessing timely and affordable medical care due to:

Poor connectivity and limited transport infrastructure

Lack of trusted medical records

Over-reliance on self-treatment or unverified advice

Chronic disease mismanagement

🎯 Vision

To create a trustworthy, low-bandwidth telemedicine ecosystem that leverages the support of ASHA workers as local facilitators, ensuring last-mile healthcare delivery in rural Himachal Pradesh.

👥 Target Users

Patients → Remote villagers with limited digital literacy, needing simple healthcare access.

ASHA Workers → On-ground health workers managing multiple patients, recording vitals, and scheduling appointments.

Doctors → Licensed practitioners who need organized access to patient history and efficient consultation tools.

🚀 Core MVP Features
✅ User Roles & Verification

Role-based login (Patient, ASHA, Doctor)

Admin panel for onboarding/verifying ASHA workers

Semi-automated (OCR + manual check) doctor verification

✅ Appointment Management

ASHA books appointments on behalf of patients

Doctor dashboard with daily schedules

Automated SMS reminders for patients

✅ Consultation Module

Low-bandwidth video consultation (WebRTC-based)

Live patient vitals entered by ASHA during call

Doctor can issue digital prescription

✅ Health Records

Simple EHR (Electronic Health Record) for each patient

Patients can view prescriptions & history anytime

🛠️ Tech Stack
Layer	Technology
Frontend	React.js + Vite + Tailwind CSS
Backend	Firebase (Firestore + Cloud Functions + Auth)
Video	WebRTC (lightweight, low-bandwidth optimized)
Hosting	Firebase Hosting
Other	PostCSS, Autoprefixer
⚡ Getting Started
1️⃣ Clone the repository
git clone https://github.com/ItsMeAnil01/ArogyaSaathi-Prototype.git
cd ArogyaSaathi-Prototype

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev


The app will be available at http://localhost:5173
.

📂 Project Structure
ArogyaSaathi-Prototype/
├── public/               # Static assets
├── src/                  # React source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Pages (Login, Dashboard, Consultation, etc.)
│   ├── styles/           # Tailwind + global CSS
│   └── main.jsx          # Entry point
├── package.json          # Dependencies & scripts
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS config
├── vite.config.js        # Vite config
└── README.md             # Project docs

📅 Roadmap (Next Steps)

 Complete user flows with wireframes

 Integrate Firebase Auth (role-based login)

 Build doctor dashboard for appointments

 Implement WebRTC video module

 Launch MVP for pilot testing in Himachal Pradesh

📜 License

This project is licensed under the MIT License – free to use, modify, and distribute.
