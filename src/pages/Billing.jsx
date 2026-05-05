import React, { useState } from 'react';

function Billing() {
  
  const allTransactions = Array.from({ length: 12 }, (_, i) => ({
    id: `INV-2026-${8050 - i}`,
    date: `${28 - i} ${i % 2 === 0 ? 'May' : 'Apr'} 2026`,
    description: i % 3 === 0 ? 'Cardiology Consultation' : i % 2 === 0 ? 'Laboratory Tests' : 'Pharmacy Prescription',
    amount: i % 3 === 0 ? '$ 150.00' : i % 2 === 0 ? '$ 85.00' : '$ 45.00',
    status: i === 0 ? 'Pending' : 'Paid', 
  }));

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentTransactions = allTransactions.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(allTransactions.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="animate-fade-in font-sans pb-10">
      
      {/* 1. Header Area */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Billing & Payments</h1>
        <p className="text-slate-500">Manage your outstanding balances, payment methods, and invoices.</p>
      </div>

      {/* 2. Top Section: Balance & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Outstanding Balance Card (Premium Gradient Design) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden flex flex-col justify-between">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-1">Total Outstanding</p>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter">$ 150.00</h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
              Pay Now
            </button>
            <p className="text-slate-400 text-sm font-medium">Due by 05 June 2026</p>
          </div>
        </div>

        {/* Saved Payment Method Card */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Payment Method</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">Add New</button>
          </div>
          
          {/* Card UI */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-auto">
            <div className="flex items-center justify-between mb-4">
              {/* Visa Logo Mock */}
              <div className="text-indigo-800 font-extrabold text-xl italic tracking-wider">VISA</div>
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="flex items-center gap-3 text-slate-600 font-medium tracking-widest text-lg">
              <span>••••</span>
              <span>••••</span>
              <span>••••</span>
              <span className="text-slate-800">4242</span>
            </div>
            <p className="text-slate-400 text-xs mt-2 uppercase font-semibold tracking-wider">Expires 12/28</p>
          </div>
        </div>

      </div>

      {/* 3. Transaction History */}
      <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Payment History</h2>
      
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div className="col-span-4">Invoice & Date</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Receipt</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-100">
          {currentTransactions.map((tx) => (
            <div key={tx.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-slate-50/50 transition-colors group">
              
              <div className="col-span-1 md:col-span-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${tx.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-slate-800 font-bold">{tx.id}</h3>
                    <p className="text-slate-500 text-sm">{tx.date}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-3">
                <p className="text-slate-600 font-medium text-sm">{tx.description}</p>
              </div>

              <div className="col-span-1 md:col-span-2">
                <p className="text-slate-800 font-bold">{tx.amount}</p>
              </div>

              <div className="col-span-1 md:col-span-2">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${
                  tx.status === 'Paid' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'
                }`}>
                  {tx.status}
                </span>
              </div>

              <div className="col-span-1 md:col-span-1 text-right">
                <button className="bg-slate-50 text-blue-600 hover:bg-blue-600 hover:text-white p-3 rounded-xl transition-all duration-300 border border-slate-100 group-hover:shadow-md" title="Download Invoice">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
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
            Showing <span className="font-bold text-slate-800">{indexOfFirstRecord + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastRecord, allTransactions.length)}</span> of <span className="font-bold text-slate-800">{allTransactions.length}</span> transactions
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

export default Billing;