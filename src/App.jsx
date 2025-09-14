import React, { useState, useEffect } from 'react';

// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, onSnapshot, query, where, getDocs, setDoc, Timestamp, addDoc, updateDoc } from 'firebase/firestore';

// --- Global Firebase Config ---
// IMPORTANT: Make sure you have pasted your actual Firebase keys here.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// --- App Initialization ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- One-Time Database Seeding Function ---
const seedDatabase = async () => {
    try {
        const checkSnapshot = await getDocs(query(collection(db, "system"), where("seeded", "==", true)));
        if (checkSnapshot.empty) {
            console.log("Seeding database with initial data...");
            await setDoc(doc(db, "doctors", "doc1"), { name: "Dr. Anjali Sharma", specialty: "General Physician" });
            await setDoc(doc(db, "doctors", "doc2"), { name: "Dr. Vikram Singh", specialty: "Pediatrician" });
            await setDoc(doc(db, "patients", "pat1"), { name: "Ramesh Kumar", age: 45, village: "Fagu", medicalHistory: "High Blood Pressure" });
            
            await addDoc(collection(db, "appointments"), {
                patientId: "pat1",
                patientName: "Ramesh Kumar",
                doctorId: "doc1",
                doctorName: "Dr. Anjali Sharma",
                appointmentDate: Timestamp.fromDate(new Date()),
                status: "Scheduled",
                prescription: null,
                notes: "",
            });

            await setDoc(doc(db, "system", "seeded"), { seeded: true });
            console.log("Database seeded successfully!");
        }
    } catch (error) {
        console.error("Error seeding database:", error);
        console.log("Please ensure your Firestore security rules are set to test mode.");
    }
};

// --- SVG Icons ---
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;


// --- Components ---

const LoginPage = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600">✚ Arogya Saathi</h1>
        <p className="mt-2 text-lg text-gray-600">Your Health Companion for Himachal</p>
        <div className="space-y-4 pt-6">
          <button onClick={() => onLogin('doctor', 'doc1')} className="w-full flex items-center justify-center px-4 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-md">Login as Doctor</button>
          <button onClick={() => onLogin('asha', 'asha1')} className="w-full px-4 py-3 font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md">Login as ASHA Worker</button>
          <button onClick={() => onLogin('patient', 'pat1')} className="w-full px-4 py-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md">Login as Patient</button>
        </div>
      </div>
    </div>
  );
};

const AshaDashboard = ({ setView }) => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "patients"), (snapshot) => {
            const patientsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPatients(patientsData);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">ASHA Worker Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage patients and appointments for your community.</p>
            <div className="mt-8">
                <button 
                    onClick={() => setView({ name: 'register_patient' })} 
                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors mb-6"
                >
                    <PlusIcon/> Register New Patient
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-xl font-semibold text-gray-700 mb-4">Registered Patients</h2>
                 <div className="space-y-3">
                    {patients.map(patient => (
                        <div key={patient.id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">{patient.name}</p>
                                <p className="text-sm text-gray-500">{patient.village}</p>
                            </div>
                            <button 
                                onClick={() => setView({ name: 'book_appointment', data: patient })}
                                className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                            >
                                <CalendarIcon /> Book Appointment
                            </button>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

const DoctorDashboard = ({ user, setView }) => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        if (!user?.id) return;
        
        // Fetch scheduled appointments
        const qAppointments = query(collection(db, "appointments"), where("doctorId", "==", user.id), where("status", "==", "Scheduled"));
        const unsubAppointments = onSnapshot(qAppointments, (snapshot) => {
            const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAppointments(apps);
        });

        // Fetch unique patients the doctor has seen
        const qPatients = query(collection(db, "appointments"), where("doctorId", "==", user.id), where("status", "==", "Completed"));
        const unsubPatients = onSnapshot(qPatients, (snapshot) => {
            const patientMap = new Map();
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                if (!patientMap.has(data.patientId)) {
                    patientMap.set(data.patientId, { id: data.patientId, name: data.patientName });
                }
            });
            setPatients(Array.from(patientMap.values()));
        });

        return () => {
            unsubAppointments();
            unsubPatients();
        };
    }, [user]);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, Dr. Sharma!</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Today's Schedule</h2>
                    <div className="mt-4 space-y-4">
                        {appointments.length > 0 ? (
                            appointments.map(app => (
                                <div key={app.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg">
                                    <div>
                                        <p className="font-bold text-lg text-gray-800">{app.patientName}</p>
                                        <p className="text-gray-600">Time: {app.appointmentDate.toDate().toLocaleTimeString()}</p>
                                    </div>
                                    <button onClick={() => setView({ name: 'consultation', data: app })} className="flex items-center px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 shadow-sm">
                                        <VideoIcon/> Start
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-md">
                                <p className="font-semibold">No upcoming appointments.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">My Patients</h2>
                     <div className="mt-4 space-y-3 bg-white p-4 rounded-lg shadow-md">
                        {patients.length > 0 ? patients.map(patient => (
                            <div key={patient.id} className="p-3 border rounded-lg flex justify-between items-center">
                                <p className="font-semibold text-gray-800">{patient.name}</p>
                                <button onClick={() => setView({ name: 'patient_history', data: patient })} className="flex items-center px-3 py-1 text-sm font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 shadow-sm">
                                    <HistoryIcon/> History
                                </button>
                            </div>
                        )) : <p className="text-gray-500 text-center p-4">No patient history yet.</p>}
                     </div>
                </div>
            </div>
        </div>
    );
};

const PatientDashboard = ({ user, setView }) => {
    const [appointments, setAppointments] = useState([]);
    const [patientInfo, setPatientInfo] = useState(null);

    useEffect(() => {
        if (!user?.id) return;
        
        // Fetch patient's own profile info
        const patientDocRef = doc(db, "patients", user.id);
        const unsubPatient = onSnapshot(patientDocRef, (doc) => {
            setPatientInfo(doc.data());
        });

        // Fetch patient's appointments
        const q = query(collection(db, "appointments"), where("patientId", "==", user.id));
        const unsubAppointments = onSnapshot(q, (snapshot) => {
            const appsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            appsData.sort((a, b) => b.appointmentDate.toDate() - a.appointmentDate.toDate());
            setAppointments(appsData);
        });

        return () => {
            unsubPatient();
            unsubAppointments();
        };
    }, [user]);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {patientInfo ? patientInfo.name : 'Patient'}!</h1>
            
            {patientInfo && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">My Profile</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Age:</strong> {patientInfo.age}</p>
                        <p><strong>Village:</strong> {patientInfo.village}</p>
                        <p className="col-span-2"><strong>Medical History:</strong> {patientInfo.medicalHistory}</p>
                    </div>
                </div>
            )}

            <h2 className="mt-8 text-xl font-semibold text-gray-700">Your Appointment History</h2>
            <div className="mt-4 space-y-4">
                {appointments.length > 0 ? (
                    appointments.map(app => (
                        <div key={app.id} className={`p-4 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg ${app.status === 'Completed' ? 'bg-green-50' : 'bg-blue-50'}`}>
                            <div>
                                <p className="font-bold text-lg text-gray-800">With {app.doctorName}</p>
                                <p className="text-gray-600">{app.appointmentDate.toDate().toLocaleString()}</p>
                                <span className={`inline-block mt-2 px-2 py-1 text-sm font-semibold rounded-full ${app.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                                    {app.status}
                                </span>
                            </div>
                            {app.status === 'Completed' && (
                                <button 
                                    onClick={() => setView({ name: 'prescription', data: app })} 
                                    className="flex items-center px-4 py-2 font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
                                >
                                    <DocumentIcon/> View Prescription
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                     <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-md">
                        <p className="font-semibold">No appointments found.</p>
                        <p className="text-sm">Contact your ASHA worker to book a new consultation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const RegisterPatientScreen = ({ setView, onRegisterPatient }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [village, setVillage] = useState('');
    const [history, setHistory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !age || !village) {
            alert("Please fill out all required fields.");
            return;
        }
        const patientData = {
            name,
            age: parseInt(age),
            village,
            medicalHistory: history || "None"
        };
        onRegisterPatient(patientData);
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <button onClick={() => setView({ name: 'asha_dashboard' })} className="text-blue-500 hover:underline mb-6">← Back to Dashboard</button>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Register New Patient</h1>
                <p className="text-gray-600 mt-2">Enter the patient's details below. Aadhaar verification will be added later.</p>
                
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Village / Area</label>
                        <input type="text" value={village} onChange={(e) => setVillage(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Known Medical History (Optional)</label>
                        <textarea value={history} onChange={(e) => setHistory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows="3"></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
                        Save Patient Record
                    </button>
                </form>
            </div>
        </div>
    );
};

const BookAppointmentScreen = ({ patient, setView, onBookAppointment }) => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "doctors"), (snapshot) => {
            const doctorsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDoctors(doctorsData);
            if (doctorsData.length > 0) {
                setSelectedDoctorId(doctorsData[0].id); // Default to the first doctor
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDoctorId) {
            alert("Please select a doctor.");
            return;
        }
        const selectedDoctor = doctors.find(doc => doc.id === selectedDoctorId);
        onBookAppointment(patient, selectedDoctor);
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <button onClick={() => setView({ name: 'asha_dashboard' })} className="text-blue-500 hover:underline mb-6">← Back to Dashboard</button>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Book Appointment</h1>
                <p className="text-gray-600 mt-2">Schedule a consultation for <span className="font-bold">{patient.name}</span>.</p>
                
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
                        <select 
                            value={selectedDoctorId} 
                            onChange={(e) => setSelectedDoctorId(e.target.value)} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
                        <p className="mt-1 p-2 bg-gray-100 rounded-md">The appointment will be scheduled for the next available slot (Today).</p>
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

const ConsultationScreen = ({ appointment, onEndConsultation }) => {
    const [notes, setNotes] = useState('');
    const [prescription, setPrescription] = useState('');
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const patientRef = doc(db, "patients", appointment.patientId);
        const unsubscribe = onSnapshot(patientRef, (doc) => {
            setPatient(doc.data());
        });
        return () => unsubscribe();
    }, [appointment.patientId]);

    const handleEndConsultation = () => {
        if (!notes || !prescription) {
            alert("Please fill out both notes and prescription before ending.");
            return;
        }
        onEndConsultation(appointment.id, notes, prescription);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <div className="w-full md:w-1/3 p-6 bg-white border-r">
                <h2 className="text-2xl font-bold border-b pb-2 text-gray-800">Patient Details</h2>
                {!patient ? (
                    <p className="mt-4 text-gray-500">Loading patient data...</p>
                ) : (
                    <div className="mt-4 space-y-3">
                        <p><strong>Name:</strong> {patient.name}</p>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Village:</strong> {patient.village}</p>
                        <div className="pt-2">
                           <p className="font-bold">Medical History:</p>
                           <p className="text-sm p-2 bg-gray-100 rounded mt-1">{patient.medicalHistory}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Live Consultation</h2>
                <div className="flex-1 bg-black rounded-lg flex items-center justify-center text-white mb-4">
                    <div className="text-center">
                        <UserIcon/>
                        <p>Low-bandwidth video feed</p>
                        <p className="text-sm text-gray-400">(UI Placeholder)</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-inner space-y-4">
                    <div>
                        <label className="font-bold text-gray-700">Doctor's Notes</label>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded h-24 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter symptoms, diagnosis, etc."></textarea>
                    </div>
                    <div>
                        <label className="font-bold text-gray-700">Prescription (Rx)</label>
                        <textarea value={prescription} onChange={(e) => setPrescription(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded h-24 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Paracetamol 500mg - 1 tablet twice a day for 3 days"></textarea>
                    </div>
                </div>
                 <button onClick={handleEndConsultation} className="mt-4 w-full py-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors shadow-md">
                    End Consultation & Send Prescription
                 </button>
            </div>
        </div>
    );
};

const PrescriptionView = ({ appointment, setView }) => (
     <div className="p-8 max-w-2xl mx-auto">
        <button onClick={() => setView({ name: 'patient_dashboard' })} className="mb-6 text-blue-500 hover:underline">← Back to Dashboard</button>
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-center text-2xl font-bold text-gray-800">✚ Digital Prescription</h1>
            <div className="grid grid-cols-2 gap-4 mt-6 border-b pb-4">
                <p><strong>Patient:</strong> {appointment.patientName}</p>
                <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                <p><strong>Date:</strong> {appointment.appointmentDate.toDate().toLocaleDateString()}</p>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700">Doctor's Notes:</h2>
                <p className="p-2 bg-gray-50 rounded mt-1">{appointment.notes || 'No notes provided.'}</p>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700">Rx (Prescription):</h2>
                <pre className="p-4 bg-blue-50 rounded mt-1 font-sans whitespace-pre-wrap">{appointment.prescription}</pre>
            </div>
        </div>
    </div>
);

const PatientHistoryView = ({ patient, setView }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "appointments"), where("patientId", "==", patient.id));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const appsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            appsData.sort((a, b) => b.appointmentDate.toDate() - a.appointmentDate.toDate());
            setAppointments(appsData);
        });
        return () => unsubscribe();
    }, [patient.id]);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <button onClick={() => setView({ name: 'doctor_dashboard' })} className="text-blue-500 hover:underline mb-6">← Back to Dashboard</button>
            <h1 className="text-3xl font-bold text-gray-800">Patient History: {patient.name}</h1>
            <div className="mt-8 space-y-4">
                {appointments.map(app => (
                    <div key={app.id} className="bg-white p-4 rounded-lg shadow-md">
                        <p className="font-semibold text-gray-700">Date: {app.appointmentDate.toDate().toLocaleString()}</p>
                        <div className="mt-4 border-t pt-4">
                             <h3 className="font-bold text-gray-800">Doctor's Notes</h3>
                             <p className="text-gray-600 mt-1">{app.notes || 'N/A'}</p>
                             <h3 className="font-bold text-gray-800 mt-2">Prescription</h3>
                             <pre className="text-gray-600 mt-1 p-2 bg-gray-50 rounded whitespace-pre-wrap font-sans">{app.prescription || 'N/A'}</pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Main App Component ---

export default function App() {
    const [view, setView] = useState({ name: 'login', data: null });
    const [user, setUser] = useState(null); // Will store user role and ID

    useEffect(() => {
        seedDatabase();
    }, []);

    const handleLogin = (role, id) => {
        setUser({ role, id });
        setView({ name: `${role}_dashboard` });
    };
    
    const handleRegisterPatient = async (patientData) => {
        try {
            const docRef = await addDoc(collection(db, "patients"), patientData);
            console.log("Patient registered with ID: ", docRef.id);
            alert("Patient registered successfully!");
            setView({ name: 'asha_dashboard' }); // Go back to ASHA dashboard
        } catch (error) {
            console.error("Error adding patient: ", error);
            alert("Failed to register patient.");
        }
    };

    const handleBookAppointment = async (patient, doctor) => {
        try {
            await addDoc(collection(db, "appointments"), {
                patientId: patient.id,
                patientName: patient.name,
                doctorId: doctor.id,
                doctorName: doctor.name,
                appointmentDate: Timestamp.fromDate(new Date()),
                status: "Scheduled",
                prescription: null,
                notes: "",
            });
            alert(`Appointment booked for ${patient.name} with ${doctor.name}!`);
            setView({ name: 'asha_dashboard' });
        } catch (error) {
            console.error("Error booking appointment: ", error);
            alert("Failed to book appointment.");
        }
    };

    const handleEndConsultation = async (appointmentId, notes, prescription) => {
        const appointmentRef = doc(db, "appointments", appointmentId);
        try {
            await updateDoc(appointmentRef, {
                status: "Completed",
                notes: notes,
                prescription: prescription
            });
            console.log("Appointment updated successfully!");
            setView({ name: 'doctor_dashboard' }); // Go back to dashboard
        } catch (error) {
            console.error("Error updating appointment: ", error);
        }
    };

    const renderView = () => {
        switch (view.name) {
            case 'login':
                return <LoginPage onLogin={handleLogin} />;
            case 'asha_dashboard':
                return <AshaDashboard setView={setView} />;
            case 'doctor_dashboard':
                return <DoctorDashboard user={user} setView={setView} />;
            case 'patient_dashboard':
                return <PatientDashboard user={user} setView={setView} />;
            case 'register_patient':
                return <RegisterPatientScreen setView={setView} onRegisterPatient={handleRegisterPatient} />;
            case 'book_appointment':
                return <BookAppointmentScreen patient={view.data} setView={setView} onBookAppointment={handleBookAppointment} />;
            case 'consultation':
                return <ConsultationScreen appointment={view.data} onEndConsultation={handleEndConsultation} />;
            case 'prescription':
                return <PrescriptionView appointment={view.data} setView={setView} />;
            case 'patient_history':
                return <PatientHistoryView patient={view.data} setView={setView} />;
            default:
                return <LoginPage onLogin={handleLogin} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {renderView()}
        </div>
    );
}

