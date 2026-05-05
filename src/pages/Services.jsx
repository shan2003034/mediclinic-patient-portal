import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DetailedServiceCard from '../components/DetailedServiceCard'; 

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/public/services')
      .then(res => {
        if (!res.ok) throw new Error("API call failed");
        return res.json();
      })
      .then(data => {
        setServices(data); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      <section 
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1538108149393-cebb47acddb2?q=80&w=2069&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-indigo-900/95 backdrop-blur-sm"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-400 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-blue-200 font-semibold tracking-wider uppercase text-sm mb-4 block">What We Do</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Our Medical Services
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            We offer a wide range of specialized medical services tailored to meet the unique needs of every patient.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service) => (
                <DetailedServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 text-lg">
              No active services found at the moment.
            </div>
          )}

        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">Need Immediate Medical Attention?</h2>
          <p className="text-blue-100 mb-10 text-lg font-light leading-relaxed">
            Our emergency department is open 24/7. For severe medical emergencies, please do not hesitate to contact us immediately or visit our clinic.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/appointments" className="w-full sm:w-auto">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full">
                Book an Appointment
              </button>
            </Link>
            <button className="bg-blue-800/50 backdrop-blur-md text-white border border-blue-400/30 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
               +94 41 222 3333
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Services;