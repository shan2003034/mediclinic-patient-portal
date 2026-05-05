import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

function RescheduleModal({ isOpen, onClose, appointment, onSuccess, onError }) {
  const [schedules, setSchedules] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && appointment) {
     
      console.log("Selected Appointment Data:", appointment); 

      if (appointment.doctorId) {
        fetch(`http://localhost:8080/api/doctors/${appointment.doctorId}/schedules`)
          .then(res => res.json())
          .then(data => {
              
              console.log("Fetched Schedules from DB:", data); 
              setSchedules(data);
              
              if (data && data.length > 0) {
                  const days = [...new Set(data.map(s => s.dayOfWeek.toLowerCase()))];
                  console.log("Enabled Days in Calendar:", days); 
                  setAvailableDays(days);
              } else {
                  console.warn("No schedules found for this doctor in the database!");
              }
          })
          .catch(err => console.error("API Fetch Error:", err));
      } else {
        console.error("🔴 Doctor ID is MISSING! Please check the Spring Boot Backend!");
      }
    }
  }, [isOpen, appointment]);

  useEffect(() => {
      if (selectedDate) {
          const dayName = format(selectedDate, 'EEEE').toLowerCase();
          const slotsForDay = schedules.filter(s => s.dayOfWeek.toLowerCase() === dayName);
          setAvailableTimeSlots(slotsForDay);
          setSelectedTimeSlot(""); 
      } else {
          setAvailableTimeSlots([]);
      }
  }, [selectedDate, schedules]);

  if (!isOpen || !appointment) return null;

 
  const isDateAllowed = (date) => {
    const dayName = format(date, 'EEEE').toLowerCase();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isFutureOrToday = date >= today; 

    return availableDays.includes(dayName) && isFutureOrToday;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedDate || !selectedTimeSlot) {
        onError("Please select both a valid date and time slot.");
        return;
    }
    
    setLoading(true);
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const res = await fetch(`http://localhost:8080/api/appointments/${appointment.id}/reschedule`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formattedDate, timeSlotId: parseInt(selectedTimeSlot) })
      });
      
      const data = await res.json();
      if(res.ok) {
          onSuccess(data.message); 
      } else {
          onError(data.error || "Failed to reschedule. Limit may be reached.");
      }
    } catch(err) {
        onError("Server Error. Please try again later.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl shadow-blue-900/20 border border-slate-100 animate-fade-in relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        
        <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Reschedule Visit</h3>
        <p className="text-slate-500 mb-8 text-sm">Select a new date and time for your appointment with {appointment.doctorName}.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">New Date</label>
            <div className="relative">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    filterDate={isDateAllowed} 
                    minDate={new Date()} 
                    placeholderText="Select available date"
                    dateFormat="dd/MM/yyyy"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-600"
                />
            </div>
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">New Time Slot</label>
            <select 
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                disabled={!selectedDate || availableTimeSlots.length === 0}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-600 appearance-none disabled:opacity-50"
            >
              <option value="">{selectedDate ? "Select Time Slot" : "First, select a date"}</option>
              {availableTimeSlots.map((schedule, index) => (
                  <option key={index} value={schedule.timeSlot.id}>
                      {schedule.timeSlot.startTime} - {schedule.timeSlot.endTime}
                  </option>
              ))}
            </select>
          </div>
          <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? "Processing..." : "Confirm Reschedule"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default RescheduleModal;