import React, { useState, useEffect } from 'react';

function NotesModal({ isOpen, onClose, appointment }) {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && appointment) {
      setLoading(true);
     
      fetch(`http://localhost:8080/api/appointments/${appointment.id}/notes`)
        .then(res => {
            if (!res.ok) throw new Error("No notes found");
            return res.json();
        })
        .then(data => {
          console.log("Prescription Data:", data); 
          setNotes(data);
          setLoading(false);
        })
        .catch(() => {
            setNotes(null);
            setLoading(false);
        });
    }
  }, [isOpen, appointment]);

  if (!isOpen || !appointment) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('printable-prescription').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); 
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl shadow-blue-900/20 border border-slate-100 animate-fade-in relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div id="printable-prescription">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Completed</span>
            <h3 className="text-2xl font-extrabold text-slate-800 mb-1">Consultation Notes</h3>
            <p className="text-slate-500 text-sm">{appointment.doctorName} • {appointment.fullDate}</p>
          </div>

          {loading ? (
            <p className="text-center text-slate-400 my-10">Loading notes...</p>
          ) : notes ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Diagnosis</h4>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm leading-relaxed">
                  {notes.diagnosis}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Prescription Details</h4>
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-sm whitespace-pre-wrap leading-relaxed text-slate-800">
                 
                  {notes.medicinceDetails || notes.medicince_details}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-rose-500 my-10 bg-rose-50 p-4 rounded-xl">No notes or prescription found for this appointment.</p>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <button onClick={handlePrint} disabled={!notes} className="flex-1 bg-blue-50 text-blue-600 font-bold py-3.5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download PDF
          </button>
        </div>

      </div>
    </div>
  );
}

export default NotesModal;