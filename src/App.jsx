import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import PatientLayout from './components/PatientLayout';
import Dashboard from './components/Dashboard';
import MyAppointments from './pages/MyAppointments';
import MedicalRecords from './pages/MedicalRecords';
import LabResults from './pages/LabResults';
import Billing from './pages/Billing';
import Settings from './pages/Settings';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />

        
        <Route 
          path="/appointments" 
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PatientLayout>
                <Dashboard />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute>
              <PatientLayout>
                <MyAppointments />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <PatientLayout>
                <MedicalRecords />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab-results"
          element={
            <ProtectedRoute>
              <PatientLayout>
                <LabResults />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <PatientLayout>
                <Billing />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PatientLayout>
                <Settings />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;