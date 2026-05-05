import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8080/api/patients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
      });

      const data = await response.json(); 

      if (response.ok) {
        localStorage.setItem('token', data.token); 
        
        setSuccess("Account created successfully! Logging you in...");
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        
       
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 2000);
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (err) {
      setError("Cannot connect to the server. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join our community for better healthcare management."
    >
      {error && (
        <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm font-bold rounded-xl border border-rose-100">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 text-sm font-bold rounded-xl border border-emerald-100">
          ✅ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-1 ml-1">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300" 
              placeholder="Shan" 
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-1 ml-1">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300" 
              placeholder="Gajanayake" 
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 text-sm font-semibold mb-1 ml-1">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300" 
            placeholder="shangaja@mail.com" 
          />
        </div>

        <div>
          <label className="block text-slate-700 text-sm font-semibold mb-1 ml-1">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            minLength="6" 
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300" 
            placeholder="Minimum 6 characters" 
          />
        </div>

        <div className="flex items-start gap-2 ml-1 py-2">
          <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-xs text-slate-500 leading-tight">
            I agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
          </span>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full text-white font-bold py-4 rounded-2xl transition-all duration-300 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1'}`}
        >
          {loading ? 'Creating Account...' : 'Register Now'}
        </button>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already a patient? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In here</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignUp;