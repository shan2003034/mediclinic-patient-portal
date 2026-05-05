import React, { useState, useRef, useEffect } from 'react';

const DEFAULT_PROFILE_PIC = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop";

function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE_PIC);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    bloodGroup: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    fetch('http://localhost:8080/api/patients/me/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          dob: data.dob || '',
          bloodGroup: data.bloodGroupName || '',
          emergencyContactName: data.emergencyContactName || '',
          emergencyContactPhone: data.emergencyContactPhone || ''
        });

        if (data.profilePicPath) {
          setProfilePic(`http://localhost:8080/${data.profilePicPath}`);
        } else {
          setProfilePic(DEFAULT_PROFILE_PIC);
        }
      })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditPictureClick = () => fileInputRef.current.click();
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem('token');

      fetch('http://localhost:8080/api/patients/me/profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` 
        },
        body: formData,
      })
      .then(res => {
        if(res.ok) {
          setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
        } else {
          setMessage({ type: 'error', text: 'Failed to update profile picture.' });
        }
      })
      .catch(() => setMessage({ type: 'error', text: 'Error uploading image.' }));
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/api/patients/me/profile', {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(profileData)
    })
    .then(res => {
      if(res.ok) setMessage({ type: 'success', text: 'Profile updated successfully!' });
      else setMessage({ type: 'error', text: 'Failed to update profile.' });
    })
    .catch(() => setMessage({ type: 'error', text: 'Server error occurred.' }));
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirm password do not match!' });
      return;
    }

    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/api/patients/me/password', {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
    })
    .then(res => {
      if(res.ok) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else if (res.status === 400) {
        setMessage({ type: 'error', text: 'Current password is incorrect!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update password.' });
      }
    })
    .catch(() => setMessage({ type: 'error', text: 'Server error occurred.' }));
  };

  return (
    <div className="animate-fade-in font-sans pb-10">
      
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Settings & Profile</h1>
        <p className="text-slate-500">Manage your personal information, security, and privacy preferences.</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:w-1/4 space-y-2">
          <button onClick={() => setActiveTab('Profile')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-left ${activeTab === 'Profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Personal Info
          </button>
          <button onClick={() => setActiveTab('Security')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-left ${activeTab === 'Security' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Security
          </button>
        </div>

        <div className="w-full lg:w-3/4">
          
          {/* --- TAB 1: PROFILE INFORMATION --- */}
          {activeTab === 'Profile' && (
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Personal Information</h2>
              
              <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-100">
                <div className="relative">
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" className="hidden" />
                  <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"/>
                  <button type="button" onClick={handleEditPictureClick} className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md border-2 border-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Profile Photo</h3>
                  <p className="text-slate-500 text-sm mb-2">JPG or PNG. Max size of 5MB.</p>
                </div>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">First Name</label>
                    <input type="text" name="firstName" value={profileData.firstName} onChange={handleProfileChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Last Name</label>
                    <input type="text" name="lastName" value={profileData.lastName} onChange={handleProfileChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Email Address</label>
                    <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Phone Number</label>
                    <input type="tel" name="phoneNumber" value={profileData.phoneNumber} onChange={handleProfileChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Date of Birth</label>
                    <input type="date" name="dob" value={profileData.dob} onChange={handleProfileChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Blood Group</label>
                    <select name="bloodGroup" value={profileData.bloodGroup} onChange={handleProfileChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium appearance-none">
                      <option value="">Select</option>
                      <option value="A+">A+</option><option value="A-">A-</option>
                      <option value="B+">B+</option><option value="B-">B-</option>
                      <option value="O+">O+</option><option value="O-">O-</option>
                      <option value="AB+">AB+</option><option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Contact Name</label>
                      <input type="text" name="emergencyContactName" value={profileData.emergencyContactName} onChange={handleProfileChange} placeholder="e.g. Jane Doe" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Contact Phone</label>
                      <input type="tel" name="emergencyContactPhone" value={profileData.emergencyContactPhone} onChange={handleProfileChange} placeholder="Emergency Number" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-1">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* --- TAB 2: SECURITY --- */}
          {activeTab === 'Security' && (
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Security Settings</h2>
              <p className="text-slate-500 mb-8 pb-8 border-b border-slate-100">Ensure your medical data is protected by using a strong password.</p>
              
              <form onSubmit={handlePasswordSave} className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Current Password</label>
                  <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">New Password</label>
                  <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">Confirm New Password</label>
                  <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-600 font-medium" />
                </div>
                <div className="pt-4">
                  <button type="submit" className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all hover:bg-slate-900 shadow-md">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Settings;