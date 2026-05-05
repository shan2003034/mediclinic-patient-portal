import React, { useState, useEffect } from 'react';
import DoctorCard from '../components/DoctorCard'; 

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  
  const [visibleCount, setVisibleCount] = useState(6); 
  
  const BASE_URL = 'http://localhost:8080/';

  
  useEffect(() => {
    
    fetch('http://localhost:8080/api/public/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, []);

 
 
  const categories = ['All', ...new Set(doctors.map(doc => doc.specialization))];


  const filteredDoctors = selectedCategory === 'All' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialization === selectedCategory);

  
  const displayedDoctors = filteredDoctors.slice(0, visibleCount);


  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-b-4"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. Modern Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-400 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-blue-200 font-semibold tracking-wider uppercase text-sm mb-4 block">Trusted Professionals</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Meet Our Experts
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            Our team of world-class specialists is dedicated to providing you with advanced medical care and personalized treatment.
          </p>
        </div>
      </section>

      {/* 2. Filter Bar - Dynamic UI */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-7 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Doctors Grid - Reusing DoctorCard */}
      <section className="pt-20">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {displayedDoctors.map((doctor) => (
              
              <DoctorCard key={doctor.id} doctor={doctor} baseUrl={BASE_URL} />
            ))}
          </div>

          {/* Load More Button Section */}
          {visibleCount < filteredDoctors.length && (
            <div className="text-center mt-16">
              <button 
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300"
              >
                Load More Doctors
              </button>
            </div>
          )}

          
          {filteredDoctors.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] shadow-inner border border-slate-100 max-w-4xl mx-auto mt-10">
              <div className="text-6xl mb-6 opacity-30">🔍</div>
              <h3 className="text-2xl text-slate-400 font-semibold">No specialists found.</h3>
              <p className="text-slate-400 mt-2">Currently, there are no doctors available in this category.</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                Show all doctors
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default Doctors;