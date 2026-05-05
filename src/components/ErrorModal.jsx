import React from 'react';

function ErrorModal({ isOpen, onClose, title = "Action Failed!", message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full mx-4 shadow-2xl shadow-rose-900/20 text-center transform scale-100 animate-fade-in border border-slate-100">
        <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
        <h3 className="text-2xl font-extrabold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 mb-8 leading-relaxed font-medium">
         
          {message || "An unexpected error occurred. Please try again."}
        </p>
        <button 
          onClick={onClose}
          className="w-full bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;