import { Route, Routes, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Tour from "./Components/Tour";
import Home from "./Components/Home";
import Hotelier from "./Components/Hotelier";
import Customer from "./Components/Customer";
import AddHotel from "./Components/AddHotel";
import ViewHotel from "./Components/ViewHotel";
import UpdateHotel from "./Components/UpdateHotel";
import DeleteHotel from "./Components/DeleteHotel";
import Register from "./Components/Register";
import Login from './Components/Login';
import Feedback from "./Components/Feedback";
import QnA from './Components/QnA';
import { useAuth } from "././Components/useAuth"; // Import the custom hook
import PaymentPage from "./Components/PaymentPage";

function App() {
  const { login, logout, userRole } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (role) => {     //
    setIsLoggedIn(true);
    login(role);
    console.log("app.js: "+userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div>
        <nav>
          {/* ... (navigation links) ... */}
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tours" element={<Tour userRole={userRole} />} /> {/* Pass userRole as a prop */}
        {isLoggedIn && (
          <>
            <Route path="hotelier" element={<Hotelier userRole={userRole} />}>  {/* Pass userRole as a prop */}
              <Route path="addHotel" element={<AddHotel />} />
              <Route path="viewHotel" element={<ViewHotel />} />
              <Route path="updateHotel" element={<UpdateHotel />} />
              <Route path="deleteHotel" element={<DeleteHotel />} />
            </Route>

            <Route path="customer" element={<Customer userRole={userRole} />} /> {/* Pass userRole as a prop */}
            <Route path="customer/:tourNumber/payment" element={<PaymentPage/>} />
            
            <Route path="feedback" element={<Feedback userRole={userRole} />} /> {/* Pass userRole as a prop */}
            <Route path="qna" element={<QnA userRole={userRole} />} /> {/* Pass userRole as a prop */}
          </>
        )}
        <Route path="register" element={<Register />} />
        <Route
          path="login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;


