import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const onClose = () => setIsOpen(false);

  
  const [patientName, setPatientName] = useState('Loading...');
 
  const [profilePic, setProfilePic] = useState("https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop");

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
       
        const decodedData = jwtDecode(token);
        const fullName = `${decodedData.firstName || ''} ${decodedData.lastName || ''}`.trim();
        setPatientName(fullName || 'Patient');

        
        fetch('http://localhost:8080/api/patients/me/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data.profilePicPath) {
              setProfilePic(`http://localhost:8080/${data.profilePicPath}`);
            }
          })
          .catch(err => console.error("Error fetching profile picture:", err));

      } catch (error) {
        console.error("Invalid token:", error);
        setPatientName('Guest');
      }
    } else {
      setPatientName('Guest');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    onClose(); 
    navigate('/login'); 
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> },
    { name: 'My Appointments', path: '/my-appointments', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> },
    { name: 'Medical Records', path: '/records', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> },
    { name: 'Lab Results', path: '/lab-results', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg> },
    { name: 'Billing & Payments', path: '/billing', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      <aside className={`
        fixed lg:sticky top-0 lg:top-4 left-0 lg:left-0 z-50
        w-72 h-screen lg:h-[calc(100vh-2rem)] lg:m-4 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden absolute top-24 -right-12 w-12 h-14 bg-white/95 backdrop-blur-xl border border-white shadow-[5px_5px_15px_rgba(0,0,0,0.1)] rounded-r-2xl flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all z-50"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          )}
        </button>

        <div className="w-full h-full bg-white/95 backdrop-blur-2xl rounded-r-[2rem] lg:rounded-[2.5rem] shadow-2xl shadow-slate-300/60 border border-white flex flex-col overflow-hidden">
          
          <div className="p-8 border-b border-slate-100 flex flex-col items-center text-center relative mt-4 lg:mt-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 mb-4 shadow-lg shadow-blue-500/30">
              <img 
                src={profilePic} 
                alt="Profile" 
                className="w-full h-full rounded-full border-2 border-white object-cover" 
              />
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mb-1">
              {patientName}
            </h3>
            
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mt-1 uppercase tracking-widest border border-blue-100">
              Patient
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
            {menuItems.map((item) => (
               <Link 
                 key={item.name} 
                 to={item.path} 
                 onClick={onClose}
                 className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold ${
                   isActive(item.path) 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 -translate-y-0.5' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                 }`}
               >
                 {item.icon}
                 {item.name}
               </Link>
            ))}
          </div>

          <div className="p-6 border-t border-slate-100 space-y-2 bg-slate-50/50">
            <Link to="/settings" onClick={onClose} className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm border border-transparent hover:border-slate-100">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> 
               Settings
            </Link>
            
            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> 
               Log Out
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;