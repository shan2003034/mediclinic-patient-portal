import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [footerData, setFooterData] = useState(null);
  const BASE_URL = 'http://localhost:8080/';

  
  useEffect(() => {
    fetch('http://localhost:8080/api/public/footer')
      .then(res => res.json())
      .then(data => setFooterData(data))
      .catch(err => console.error("Error fetching footer data:", err));
  }, []);

  return (
    <footer className="bg-slate-900 pt-20 pb-10 mt-20 relative overflow-hidden border-t-4 border-blue-600">

      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-900 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* 1. Brand Info (Database Data) */}
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tight">
              MediClinic<span className="text-blue-500">.</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {footerData?.description || "Your trusted healthcare partner. With experienced doctors and state-of-the-art facilities, we provide you with the highest quality service."}
            </p>

            
            <div className="flex gap-4">
              {footerData?.socialMediaLinks?.map(social => (
                <a
                  key={social.id}
                  href={social.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                  title={social.platformName}
                >
                  {social.iconPath ? (
                    <img
                      src={`${BASE_URL}${social.iconPath}`}
                      alt={social.platformName}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    
                    <span className="text-xs font-bold">{social.platformName.substring(0, 2).toUpperCase()}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-medium">
              <li><Link to="/" className="hover:text-blue-400 hover:translate-x-2 inline-block transition-transform">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 hover:translate-x-2 inline-block transition-transform">About Us</Link></li>
              <li><Link to="/doctors" className="hover:text-blue-400 hover:translate-x-2 inline-block transition-transform">Our Doctors</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 hover:translate-x-2 inline-block transition-transform">Contact Us</Link></li>
            </ul>
          </div>

          {/* 3. Departments */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Departments</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-medium">
              <li><Link to="/services" className="hover:text-blue-400 hover:translate-x-2 inline-block transition-transform">Cardiology</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 hover:translate-x-2 inline-block transition-transform">Neurology</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 hover:translate-x-2 inline-block transition-transform">Pediatrics</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 hover:translate-x-2 inline-block transition-transform">Orthopedics</Link></li>
            </ul>
          </div>

          {/* 4. Contact Details (Database Data) */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-lg mt-0.5">📍</span>
                <span className="whitespace-pre-line">{footerData?.contactInfo?.address || "Loading..."}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-lg">📞</span>
                <span>{footerData?.contactInfo?.emergencyNumber || "Loading..."}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-lg">✉️</span>
                <span>{footerData?.contactInfo?.emailAddress || "Loading..."}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar (Database Data) */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-medium">
          <p>{footerData?.copyrightText || `© ${new Date().getFullYear()} MediClinic. All rights reserved.`}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white cursor-pointer transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white cursor-pointer transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;