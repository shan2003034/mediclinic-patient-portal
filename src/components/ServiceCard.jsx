import React from 'react';

function ServiceCard({ service, baseUrl }) {
  return (
    <div className="group bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
      
      {/* Icon Wrapper (Database Image) */}
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
        {service.iconPath ? (
           <img 
             src={`${baseUrl}${service.iconPath}`} 
             alt={service.title} 
             className="w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
           />
        ) : (
           <span className="text-4xl group-hover:text-white">🩺</span> 
        )}
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{service.description}</p>
      
    </div>
  );
}

export default ServiceCard;