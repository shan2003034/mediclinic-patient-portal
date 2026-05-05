import React, { useState, useEffect } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import RescheduleModal from '../components/RescheduleModal';
import NotesModal from '../components/NotesModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

function MyAppointments() {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [appointmentsList, setAppointmentsList] = useState([]);

    const navigate = useNavigate();

    const fetchAppointments = () => {
        fetch('http://localhost:8080/api/appointments/patient/1') 
            .then(res => res.json())
            .then(data => {
                const formattedData = data.map(app => {
                    const dateObj = new Date(app.date);
                    const shortDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }); 
                    const fullDateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' }); 

                    return {
                        id: app.id,
                        
                        doctorId: app.doctorId, 
                        
                        doctorName: app.doctorName,
                        specialty: app.specialty,
                        date: shortDate,
                        fullDate: fullDateStr,
                        time: app.time,
                        status: app.statusId === 1 ? 'Upcoming' : 'Past',
                        realStatusId: app.statusId, 
                        type: "In-Person", 
                        image: app.image ? `http://localhost:8080/${app.image}` : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
                    };
                });
                setAppointmentsList(formattedData);
            })
            .catch(err => console.error("Error fetching appointments:", err));
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCancelClick = (id) => {
        setAppointmentToCancel(id);
        setIsConfirmOpen(true);
    };

    const executeCancel = async () => {
        setIsConfirmOpen(false);
        if (!appointmentToCancel) return;

        try {
            const res = await fetch(`http://localhost:8080/api/appointments/${appointmentToCancel}/cancel`, {
                method: 'PUT'
            });
            const data = await res.json();

            if (res.ok) {
                setSuccessMessage(data.message);
                setIsSuccessModalOpen(true);
                fetchAppointments(); 
            } else {
                setErrorMessage(data.error || "Failed to cancel.");
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            setErrorMessage("Server error. Please try again.");
            setIsErrorModalOpen(true);
        } finally {
            setAppointmentToCancel(null);
        }
    };

    const filteredAppointments = appointmentsList.filter(app => app.status === activeTab);

    const handleBookNew = () => {
        navigate('/appointments');
    };

    const getBadgeInfo = (statusId) => {
        if (statusId === 1) return { text: "Confirmed", classes: "bg-emerald-50 text-emerald-600 border-emerald-100" };
        if (statusId === 2) return { text: "Completed", classes: "bg-blue-50 text-blue-600 border-blue-100" };
        if (statusId === 3) return { text: "Cancelled", classes: "bg-rose-50 text-rose-600 border-rose-100" };
        return { text: "Past", classes: "bg-slate-100 text-slate-500 border-slate-200" };
    };

    return (
        <div className="animate-fade-in font-sans pb-10">

            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">My Appointments</h1>
                    <p className="text-slate-500">View and manage your upcoming and past medical appointments.</p>
                </div>

                <button
                    onClick={handleBookNew}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 w-full md:w-auto"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Book New Appointment
                </button>
            </div>

            {/* 2. Modern Tabs */}
            <div className="flex flex-wrap gap-4 mb-10 bg-white p-2 rounded-3xl w-max shadow-sm border border-slate-100">
                <button
                    onClick={() => setActiveTab('Upcoming')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${activeTab === 'Upcoming'
                        ? 'bg-slate-800 text-white shadow-md shadow-slate-800/20'
                        : 'text-slate-500 hover:bg-slate-50'
                        }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab('Past')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${activeTab === 'Past'
                        ? 'bg-slate-800 text-white shadow-md shadow-slate-800/20'
                        : 'text-slate-500 hover:bg-slate-50'
                        }`}
                >
                    Past History
                </button>
            </div>

            {/* 3. Appointments List */}
            <div className="space-y-6">

                {filteredAppointments.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No {activeTab} Appointments</h3>
                        <p className="text-slate-500 mb-6">You don't have any {activeTab.toLowerCase()} appointments at the moment.</p>

                        {activeTab === 'Upcoming' && (
                            <button
                                onClick={handleBookNew}
                                className="bg-blue-50 text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-100 transition-colors"
                            >
                                Book New Appointment
                            </button>
                        )}
                    </div>
                ) : (
                    filteredAppointments.map((appointment) => {
                        const badgeInfo = getBadgeInfo(appointment.realStatusId);

                        return (
                            <div key={appointment.id} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row items-center gap-6 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">

                                <div className={`absolute left-0 top-0 bottom-0 w-2 ${appointment.status === 'Upcoming' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>

                                <div className={`rounded-2xl p-6 text-center min-w-[120px] ${appointment.status === 'Upcoming' ? 'bg-blue-50' : 'bg-slate-50'}`}>
                                    <h3 className={`text-3xl font-extrabold ${appointment.status === 'Upcoming' ? 'text-blue-600' : 'text-slate-500'}`}>
                                        {appointment.date.split(' ')[0]}
                                    </h3>
                                    <p className={`font-bold uppercase tracking-widest text-xs mt-1 ${appointment.status === 'Upcoming' ? 'text-blue-400' : 'text-slate-400'}`}>
                                        {appointment.date.split(' ')[1]}
                                    </p>
                                </div>

                                <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full text-center sm:text-left">
                                    <img
                                        src={appointment.image}
                                        alt={appointment.doctorName}
                                        className="w-20 h-20 rounded-full object-cover shadow-sm border-2 border-white"
                                    />
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1 justify-center sm:justify-start">
                                            <h3 className="text-xl font-bold text-slate-800">{appointment.doctorName}</h3>
                                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest w-max mx-auto sm:mx-0 border ${badgeInfo.classes}`}>
                                                {badgeInfo.text}
                                            </span>
                                        </div>

                                        <p className="text-blue-600 font-medium text-sm mb-3">{appointment.specialty} Specialist</p>

                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-500 text-sm font-medium">
                                            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {appointment.fullDate}</span>
                                            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {appointment.time}</span>
                                            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> {appointment.type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                                    {appointment.status === 'Upcoming' ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setSelectedAppointment(appointment); 
                                                    setIsRescheduleOpen(true);
                                                }}
                                                className="bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white px-6 py-2.5 rounded-xl font-bold transition-colors text-sm border border-slate-100 hover:border-blue-600 shadow-sm w-full"
                                            >
                                                Reschedule
                                            </button>
                                            <button
                                                onClick={() => handleCancelClick(appointment.id)}
                                                className="bg-slate-50 text-rose-500 hover:bg-rose-50 px-6 py-2.5 rounded-xl font-bold transition-colors text-sm border border-slate-100 w-full"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        
                                        <button
                                            onClick={() => {
                                                setSelectedAppointment(appointment); 
                                                setIsNotesOpen(true);
                                            }}
                                            disabled={appointment.realStatusId === 3}
                                            className={`w-full px-6 py-2.5 rounded-xl font-bold transition-colors text-sm border border-slate-100 
                                                ${appointment.realStatusId === 3
                                                    ? 'bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
                                                    : 'bg-slate-50 text-blue-600 hover:bg-blue-50'}`}
                                        >
                                            {appointment.realStatusId === 3 ? 'No Notes Available' : 'View Notes'}
                                        </button>
                                    )}
                                </div>

                            </div>
                        )
                    })
                )}

            </div>

            <RescheduleModal
                isOpen={isRescheduleOpen}
                onClose={() => setIsRescheduleOpen(false)}
                appointment={selectedAppointment}

                onSuccess={(msg) => {
                    setIsRescheduleOpen(false);
                    setSuccessMessage(msg);
                    setIsSuccessModalOpen(true);
                }}

                onError={(err) => {
                    setIsRescheduleOpen(false);
                    setErrorMessage(err);
                    setIsErrorModalOpen(true);
                }}
            />
            <NotesModal
                isOpen={isNotesOpen}
                onClose={() => setIsNotesOpen(false)}
                appointment={selectedAppointment}
            />

            {/* Custom Modals */}
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => {
                    setIsSuccessModalOpen(false);
                    window.location.reload(); 
                }}
                message={successMessage}
                title="Action Successful"
            />
            <ErrorModal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} message={errorMessage} title="Cancellation Failed" />

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => {
                    setIsConfirmOpen(false);
                    setAppointmentToCancel(null);
                }}
                onConfirm={executeCancel}
                title="Cancel Appointment?"
                message="Are you sure you want to cancel this appointment? This action cannot be undone and your slot will be given to another patient."
                confirmText="Yes, Cancel"
                cancelText="No, Keep It"
            />

        </div>
    );
}

export default MyAppointments;