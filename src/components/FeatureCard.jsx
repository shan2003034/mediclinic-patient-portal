import React from 'react';


function FeatureCard({ feature, baseUrl }) {
  return (
    <div className="group relative bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center overflow-hidden z-10">
      
      {/* Background Hover Effect (Modern Touch) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

      {/* Icon Container with subtle animation */}
      <div className="w-20 h-20 bg-blue-50/80 backdrop-blur-sm text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-blue-100 group-hover:border-blue-500 shadow-sm">
        {feature.iconPath ? (
          <img 
            src={`${baseUrl}${feature.iconPath}`} 
            alt={feature.title} 
            className="w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300" 
          />
        ) : (
          // Default Icon if none provided
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors text-center">
        {feature.title}
      </h3>
      <p className="text-slate-500 leading-relaxed text-center text-sm font-medium">
        {feature.description}
      </p>
    </div>
  );
}

export default FeatureCard;