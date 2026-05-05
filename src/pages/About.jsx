import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard'; 

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const BASE_URL = 'http://localhost:8080/';

  
  useEffect(() => {
    fetch('http://localhost:8080/api/public/about')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then(data => {
        setAboutData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching about data:", err);
        setError("Could not load about information.");
        setLoading(false);
      });
  }, []);

  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading details...</p>
      </div>
    );
  }

  
  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500 font-bold">
        {error || "Something went wrong."}
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* 1. Modern Hero Section */}
      <section 
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ 
          
          backgroundImage: `url('https://i.ibb.co/dJ665nZs/diverse-group-people-waiting-hospital-reception-lobby-attend-medical-appointment-with-general-practi.jpg')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-indigo-900/95 backdrop-blur-sm"></div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-400 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-blue-200 font-semibold tracking-wider uppercase text-sm mb-4 block">Discover Our Journey</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            About MediClinic
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            Providing compassionate, world-class healthcare to the Matara community and beyond.
          </p>
        </div>
      </section>

      {/* 2. Our Story & Vision Section (Dynamic Data) */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Dynamic Image from Database */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] transform translate-x-4 translate-y-4 opacity-20 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
              <img 
                src={`${BASE_URL}${aboutData.storyImagePath}`} 
                alt={aboutData.storyTitle} 
                className="rounded-[2.5rem] shadow-2xl shadow-slate-300/50 object-cover w-full h-[450px] relative z-10"
                onError={(e) => { e.target.src = "https://i.ibb.co/p69BXqzY/happy-doctor-holding-clipboard-with-patients.jpg" }} // Image එක නැත්නම් Default එක පෙන්වනවා
              />
            </div>

            {/* Dynamic Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 tracking-tight">{aboutData.storyTitle}</h2>
              <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                {aboutData.storyDescription}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {/* Mission Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-2 hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5">
                     {aboutData.missionIconPath ? 
                        <img src={`${BASE_URL}${aboutData.missionIconPath}`} className="w-7 h-7" alt="Mission" /> : 
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                     }
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{aboutData.missionTitle}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{aboutData.missionDescription}</p>
                </div>
                
                {/* Vision Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-2 hover:shadow-indigo-500/10 transition-all duration-300">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5">
                    {aboutData.visionIconPath ? 
                        <img src={`${BASE_URL}${aboutData.visionIconPath}`} className="w-7 h-7" alt="Vision" /> : 
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                     }
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{aboutData.visionTitle}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{aboutData.visionDescription}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section - Using the New Component */}
      <section className="bg-white py-24 border-t border-slate-100 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Our Excellence</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Why Choose MediClinic?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           
            {aboutData.features && aboutData.features.length > 0 ? (
              aboutData.features.map(feature => (
                <FeatureCard key={feature.id} feature={feature} baseUrl={BASE_URL} />
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 py-10">No features added yet.</div>
            )}
          </div>

        </div>
      </section>

      {/* 4. Modern Call to Action (No changes here) */}
      <section className="py-24 bg-slate-50 text-center">
         <div className="container mx-auto px-6 max-w-4xl bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl"></div>
           
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 tracking-tight">Ready to Experience Better Healthcare?</h2>
             <p className="text-slate-500 mb-10 max-w-xl mx-auto text-lg">Book your appointment today and take the first step towards a healthier you with our expert medical team.</p>
             <Link to="/appointments">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300">
                  Book an Appointment
                </button>
             </Link>
           </div>
         </div>
      </section>

    </div>
  );
}

export default About;