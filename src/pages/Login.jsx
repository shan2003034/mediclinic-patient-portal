import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
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
      const response = await fetch('http://localhost:8080/api/patients/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json(); 

      if (response.ok) {
     
        localStorage.setItem('token', data.token); 
        
        setSuccess("Login successful! Redirecting...");
        
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 1500);
      } else {
        setError(data.message || "Invalid email or password!");
      }
    } catch (err) {
      setError("Cannot connect to the server. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Please enter your details to access your portal."
    >
      
      {error && (
        <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-sm font-medium rounded-r-xl shadow-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
            {error}
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm font-medium rounded-r-xl shadow-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            {success}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300" 
            placeholder="example@mail.com" 
          />
        </div>

        <div>
          <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300" 
            placeholder="••••••••" 
          />
        </div>

        <div className="flex items-center justify-between ml-1">
          <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /> Remember me
          </label>
          <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot Password?</a>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full text-white font-bold py-4 rounded-2xl transition-all duration-300 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1'}`}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-center text-slate-500 text-sm mt-8">
          Don't have an account? <Link to="/signUp" className="text-blue-600 font-bold hover:underline">Create Account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;