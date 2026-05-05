import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, isSameDay, getDay } from 'date-fns';

function BookingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    department: '',
    doctorId: '',
    date: null, 
    time: '',
    timeSlotId: '', 
    reason: ''
  });

  const [departmentsList, setDepartmentsList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  
  
  const [availableDays, setAvailableDays] = useState([]);
  const [leaveDates, setLeaveDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [allSchedules, setAllSchedules] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  useEffect(() => {
    fetch('http://localhost:8080/api/specializations')
      .then(response => response.json())
      .then(data => setDepartmentsList(data))
      .catch(error => console.error("Error fetching departments:", error));
  }, []);

  
  useEffect(() => {
    if (formData.department) {
      fetch(`http://localhost:8080/api/doctors/department/${formData.department}`)
        .then(response => response.json())
        .then(data => {
          setDoctorsList(data);
          
          setFormData(prev => ({ ...prev, doctorId: '', date: null, time: '', timeSlotId: '' })); 
          setAvailableDays([]);
          setLeaveDates([]);
          setAvailableTimeSlots([]);
        })
        .catch(error => console.error("Error fetching doctors:", error));
    } else {
      setDoctorsList([]);
      setFormData(prev => ({ ...prev, doctorId: '', date: null, time: '', timeSlotId: '' }));
    }
  }, [formData.department]);

  
  useEffect(() => {
    if (formData.doctorId) {
      fetch(`http://localhost:8080/api/doctors/${formData.doctorId}/availability`)
        .then(response => response.json())
        .then(data => {
          
          const daysMap = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
          const numericDays = data.availableDays.map(day => daysMap[day]);
          
          setAvailableDays(numericDays);
          setLeaveDates(data.leaveDates.map(date => parseISO(date)));
          setAllSchedules(data.schedules);
          
          
          setFormData(prev => ({ ...prev, date: null, time: '', timeSlotId: '' }));
          setAvailableTimeSlots([]);
        })
        .catch(error => console.error("Error fetching availability:", error));
    }
  }, [formData.doctorId]);

  
  useEffect(() => {
    if (formData.date && allSchedules.length > 0) {
      const selectedDayName = format(formData.date, 'EEEE'); 
      
    
      const slotsForDay = allSchedules.filter(s => s.dayOfWeek === selectedDayName);
      setAvailableTimeSlots(slotsForDay);
      setFormData(prev => ({ ...prev, time: '', timeSlotId: '' }));
    }
  }, [formData.date, allSchedules]);

  
  const isSelectableDate = (date) => {
    const day = getDay(date); 
    
    const isAvailableDay = availableDays.includes(day);
    
    const isLeaveDate = leaveDates.some(leaveDate => isSameDay(date, leaveDate));
    
    const isFutureDate = date >= new Date(new Date().setHours(0,0,0,0));

    
    return isAvailableDay && !isLeaveDate && isFutureDate;
  };

 
  const handleTimeChange = (e) => {
    const selectedSlotId = e.target.value;
    const selectedSlot = availableTimeSlots.find(slot => slot.timeSlotId.toString() === selectedSlotId);
    
    setFormData({
      ...formData,
      timeSlotId: selectedSlotId,
      time: selectedSlot ? selectedSlot.timeSlot : ''
    });
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Appointment Details</h2>
      <p className="text-slate-500 mb-8">Please provide your preferred time and contact details.</p>
      
      <form onSubmit={async (e) => {
          e.preventDefault();
          const finalData = {
              ...formData,
              date: formData.date ? format(formData.date, 'yyyy-MM-dd') : ''
          };
          
          
          const isSuccess = await onSubmit(finalData);
          
          
          if (isSuccess) {
            setFormData({
              phoneNumber: '',
              department: '',
              doctorId: '',
              date: null,
              time: '',
              timeSlotId: '',
              reason: ''
            });
            setDoctorsList([]);
            setAvailableTimeSlots([]);
            setAvailableDays([]);
            setLeaveDates([]);
            setAllSchedules([]);
          }
      }} className="space-y-6">
        
        {/* Contact Info */}
        <div>
          <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Contact Phone Number</label>
          <input 
            type="tel" 
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300" 
            placeholder="+94 7X XXX XXXX" 
          />
        </div>

        {/* Appointment Information */}
        <div className="border-t border-slate-100 pt-6 mt-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Medical Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Department</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-600 appearance-none"
              >
                <option value="">Select Department</option>
                {departmentsList.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Preferred Doctor</label>
              <select 
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
                disabled={!formData.department || doctorsList.length === 0} 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-600 appearance-none disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {formData.department && doctorsList.length === 0 
                    ? "No doctors available" 
                    : "Select Doctor"}
                </option>
                {doctorsList.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time with React Datepicker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Preferred Date</label>
              
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                filterDate={isSelectableDate} 
                minDate={new Date()} 
                placeholderText="Select available date"
                disabled={!formData.doctorId} 
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Preferred Time</label>
              <select 
                name="timeSlotId"
                value={formData.timeSlotId}
                onChange={handleTimeChange}
                required
                disabled={!formData.date || availableTimeSlots.length === 0}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-600 appearance-none disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="">
                    {formData.date && availableTimeSlots.length === 0 
                    ? "No slots available" 
                    : "Select Time Slot"}
                </option>
                
                {availableTimeSlots.map((slot) => (
                  <option key={slot.timeSlotId} value={slot.timeSlotId}>
                    {slot.timeSlot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Reason for Visit (Optional)</label>
            <textarea 
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3" 
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-700 resize-none" 
              placeholder="Briefly describe your symptoms..."
            ></textarea>
          </div>
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 mt-4 flex justify-center items-center gap-2">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}

export default BookingForm;