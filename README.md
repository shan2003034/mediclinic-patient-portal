
# 🏥 MediClinic - Patient Portal

<div align="center">
  <!-- ඔයා Banner එකක් හැදුවට පස්සේ ඒකෙ ලින්ක් එක මෙතන 'src' එකට දාන්න -->
  <img width="2400" height="1080" alt="Image" src="https://github.com/user-attachments/assets/f7bc89b9-2fb0-444d-ac51-c722d86adc85" />
</div>

Welcome to the **Patient Portal** of the MediClinic Healthcare Management System. This frontend application allows patients to seamlessly interact with clinic services, manage their health records, and book appointments online.

## 🚀 Live Demo / Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img alt="Home Page" src="https://github.com/user-attachments/assets/47a03be9-0162-45f4-809b-0938fca3ef32" width="100%" />
        <br><b>🏠 Home Page</b>
      </td>
      <td align="center">
        <img alt="About us page" src="https://github.com/user-attachments/assets/15a4ef2c-cc9b-4503-a27a-0a8b2c539876" width="100%" />
        <br><b>ℹ️ About Us</b>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img alt="Contact us page" src="https://github.com/user-attachments/assets/594a0cc9-9dfe-48fd-af40-0768440c3dbe" width="100%" />
        <br><b>📞 Contact Us</b>
      </td>
      <td align="center">
        <img alt="Login Page" src="https://github.com/user-attachments/assets/6bf9683f-75f9-41e7-bed7-de1af9a636c9" width="100%" />
        <br><b>🔐 Login Page</b>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img alt="Patient Dashboard" src="https://github.com/user-attachments/assets/0c184cb5-9b01-4386-89e0-ae30cefc7927" width="100%" />
        <br><b>📊 Patient Dashboard</b>
      </td>
      <td align="center">
        <img alt="My Appointments" src="https://github.com/user-attachments/assets/95b9cef8-6fa2-4b4a-927b-2a70207ba90d" width="100%" />
        <br><b>📅 My Appointments</b>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img alt="Medical Records" src="https://github.com/user-attachments/assets/55c45777-26d9-4bd1-806a-c451fb0721ad" width="100%" />
        <br><b>📋 Medical Records</b>
      </td>
      <td align="center">
        <img alt="Patient Profile" src="https://github.com/user-attachments/assets/1ab58e4f-40ec-4ab0-a4bc-e9c64b828400" width="100%" />
        <br><b>👤 Patient Profile</b>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img alt="Book an Appointment" src="https://github.com/user-attachments/assets/e5a88551-032b-49b8-b4cd-1632b7cc9290" width="100%" />
        <br><b>🩺 Book an Appointment</b>
      </td>
      <td align="center">
        <!-- මේ කොටුව හිස්ව තියෙනවා පින්තූර 9ක් විතරක් තියෙන නිසා -->
      </td>
    </tr>
  </table>
</div>

## ✨ Key Features
*   **User Authentication:** Secure patient registration and login with JWT.
*   **Dynamic Home Page:** View clinic statistics, top services, and expert doctors.
*   **Appointment Management:** Book, reschedule, and cancel appointments with ease.
*   **Medical Records:** Access past medical history, lab results, and prescriptions.
*   **Responsive Design:** Fully optimized modern UI for both mobile and desktop devices.

## 💻 Tech Stack
*   **Framework:** React 18 (with Vite)
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **Icons & Assets:** FontAwesome / Custom SVG components

## 🔗 Related Repositories
Since this project uses a microservices-like architecture, it is divided into three repositories:
1.  [MediClinic - Backend (Spring Boot)](https://github.com/shan2003034/mediclinic-backend)
2.  [MediClinic - Staff Portal (React)](https://github.com/shan2003034/mediclinic-staff-portal)
3.  **MediClinic - Patient Portal (React)** 👈 *(You are here)*

## 🛠️ Installation & Setup

Follow these steps to run the Patient Portal locally on your machine.

**1. Clone the repository**
```bash
git clone [https://github.com/shan2003034/mediclinic-patient-portal.git](https://github.com/shan2003034/mediclinic-patient-portal.git)
cd mediclinic-patient-portal
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure Environment Variables**
Create a `.env` file in the root directory and add the backend API URL:
```env
VITE_API_BASE_URL=http://localhost:8080
```

**4. Run the development server**
```bash
npm run dev
```
The application will start running at `http://localhost:5173`. Make sure the **Spring Boot Backend** is also running for data fetching to work perfectly.

## 👨‍💻 Author
**Prasanna Lakshan**
* 🌐 Portfolio: [https://prasanna-lakshan-portfolio.vercel.app/](https://prasanna-lakshan-portfolio.vercel.app/)
* 💼 LinkedIn: [https://www.linkedin.com/in/prasannalakshan](https://www.linkedin.com/in/prasannalakshan)
* 💻 GitHub: [https://github.com/shan2003034](https://github.com/shan2003034)

