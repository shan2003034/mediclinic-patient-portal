import React from 'react';

function AlertBanner({ title, message, buttonText, onButtonClick, type = 'warning' }) {
  
  const styles = {
    warning: {
      bg: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200/60',
      iconBg: 'bg-amber-100 text-amber-600',
      title: 'text-amber-800',
      text: 'text-amber-700/80',
      button: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
    },
    
  };

  const currentStyle = styles[type] || styles.warning;

  return (
    <div className={`${currentStyle.bg} border rounded-[2rem] p-6 mb-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${currentStyle.iconBg}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <div className="flex-1">
        <h3 className={`${currentStyle.title} font-bold text-lg mb-1`}>{title}</h3>
        <p className={`${currentStyle.text} text-sm`}>{message}</p>
      </div>
      {buttonText && (
        <button 
          onClick={onButtonClick}
          className={`${currentStyle.button} text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap shadow-md`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default AlertBanner;