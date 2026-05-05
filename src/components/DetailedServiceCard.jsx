import React from 'react';

function DetailedServiceCard({ service }) {
 
  const BASE_URL = 'http://localhost:8080/';

  return (
    <div className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      
      {/* Icon Section */}
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 overflow-hidden">
        {service.iconPath ? (
         
          <img 
            src={`${BASE_URL}${service.iconPath}`} 
            alt={service.title} 
            className="w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
          />
        ) : (
         
          <svg className="w-8 h-8 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        )}
      </div>

      {/* Text Section */}
      <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
        {service.title}
      </h3>
      
     
      <p className="text-slate-500 mb-8 leading-relaxed flex-grow">
        {service.description}
      </p>

      {/* Treatments List Section */}
      <div className="border-t border-slate-100 pt-6 mt-auto">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Key Treatments:</h4>
        <ul className="space-y-3">
          
          {service.treatments && service.treatments.map((treatment, index) => (
            <li key={index} className="flex items-start text-slate-500 text-sm font-medium">
              <span className="text-blue-500 mr-3 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span> 
              {treatment}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default DetailedServiceCard;