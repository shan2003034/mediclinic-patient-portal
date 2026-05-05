import React, { useState } from 'react';
import AlertBanner from '../components/AlertBanner';
import BiomarkerCard from '../components/BiomarkerCard';

function LabResults() {
  const keyMetrics = [
    { name: 'Fasting Blood Sugar', value: '92', unit: 'mg/dL', status: 'Normal', range: '70 - 100', color: 'emerald', percentage: 40 },
    { name: 'LDL Cholesterol', value: '158', unit: 'mg/dL', status: 'High', range: '< 100', color: 'rose', percentage: 85 },
    { name: 'Hemoglobin (Hb)', value: '14.2', unit: 'g/dL', status: 'Normal', range: '13.8 - 17.2', color: 'blue', percentage: 60 },
    { name: 'Vitamin D', value: '24', unit: 'ng/mL', status: 'Low', range: '30 - 100', color: 'amber', percentage: 20 },
  ];

 
  const allLabReports = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    testName: i % 2 === 0 ? 'Complete Blood Count (CBC)' : i % 3 === 0 ? 'Lipid Panel' : 'Thyroid Profile',
    date: `${(i % 28) + 1} May 2026`,
    lab: i % 2 === 0 ? 'City Center Lab' : 'MediCare Diagnostics',
    status: 'Final',
    isNew: i < 2 
  }));

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = allLabReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(allLabReports.length / reportsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="animate-fade-in font-sans pb-10">
      
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Lab Results</h1>
        <p className="text-slate-500">Track your biomarkers and download your recent laboratory test reports.</p>
      </div>

    
      <AlertBanner 
        title="Attention Required: Lipid Profile"
        message="Your recent LDL Cholesterol level is higher than the recommended range. Please schedule a follow-up with Dr. Sarah Johnson."
        buttonText="Book Appointment"
        type="warning"
        onButtonClick={() => alert('Redirecting to booking...')}
      />

      
      <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Latest Key Biomarkers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {keyMetrics.map((metric, index) => (
          <BiomarkerCard key={index} metric={metric} />
        ))}
      </div>

      {/* 3. Paginated Full Lab Reports List */}
      <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Full Test Reports</h2>
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div className="divide-y divide-slate-100">
          {currentReports.map((report) => (
            <div key={report.id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{report.testName}</h3>
                    {report.isNew && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                    <span>{report.date}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{report.lab}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none bg-slate-50 text-slate-600 hover:bg-slate-100 px-5 py-3 rounded-xl font-bold transition-colors text-sm border border-slate-100">View Online</button>
                <button className="flex-1 sm:flex-none bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-3 rounded-xl font-bold transition-colors text-sm border border-blue-100 hover:border-blue-600 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Modern Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium hidden sm:block">
            Showing <span className="font-bold text-slate-800">{indexOfFirstReport + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastReport, allLabReports.length)}</span> of <span className="font-bold text-slate-800">{allLabReports.length}</span> reports
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`p-2 rounded-xl transition-all flex items-center justify-center ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => paginate(index + 1)} className={`w-10 h-10 rounded-xl font-bold transition-all text-sm flex items-center justify-center ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {index + 1}
                </button>
              ))}
            </div>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 rounded-xl transition-all flex items-center justify-center ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default LabResults;