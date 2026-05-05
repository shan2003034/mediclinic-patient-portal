import React from 'react';
import { Link } from 'react-router-dom';

function DoctorCard({ doctor, baseUrl }) {
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
      
      {/* Image with Zoom Effect & Badge */}
      <div className="h-64 overflow-hidden relative bg-slate-100">
        <img 
          src={`${baseUrl}${doctor.profileImg}`} 
          alt={doctor.name} 
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" 
          onError={(e) => { e.target.src = "https://i.ibb.co/8b7vFkV/default-doctor.jpg" }} // DB Image එක අවුල් නම් මේක පෙන්වයි
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-md text-blue-600 text-xs font-bold px-4 py-2 rounded-2xl shadow-sm uppercase tracking-widest">
            {doctor.specialization}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-8 text-center flex-1 flex flex-col justify-between">
        <div>
           <h3 className="text-2xl font-extrabold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{doctor.name}</h3>
           <p className="text-slate-500 font-medium text-sm mb-6">{doctor.specialization} Specialist</p>
        </div>
        
        
        <Link to={`/appointments?doctor=${doctor.id}`}>
          <button className="w-full bg-slate-50 text-blue-600 font-bold py-3.5 rounded-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
            Book Appointment
          </button>
        </Link>
      </div>

    </div>
  );
}

export default DoctorCard;