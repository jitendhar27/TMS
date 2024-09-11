import React from 'react'
import { Link, Outlet } from 'react-router-dom';

import hotel1 from '../pics/hotel1.jpg';

const hotelStyle = {
  backgroundImage: `url(${hotel1})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.4) !important', // 0.6 sets the transparency to 60%
  minHeight: '120%', // Ensures the background covers the entire viewport height
  minWidth: '100%', // Add this
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',

  backgroundImage: `url(${hotel1})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.4) !important', // 0.6 sets the transparency to 60%
  minHeight: '120%', // Ensures the background covers the entire viewport height
  minWidth: '100%', // Add this
  flexDirection: 'row',
  alignItems: 'center',
  marginTop : '20px'
};


const LinkStyles = ({ isActive }) => {
  return {
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
  };
};

export default function Hotelier({ userRole }) {
  


  return (

    <>
    <div style={hotelStyle}>

        <nav style={navStyle}>
            
            <Link to="viewHotel">VIEW HOTEL</Link>

            {userRole === 'hotelier' && (
              <>
              <Link to="addHotel" >ADD HOTEL</Link>
              <Link to="updateHotel">UPDATE HOTEL</Link>
              <Link to="deleteHotel">DELETE HOTEL</Link>
            </>
            )}
        </nav>
    </div>

    <div>
        <Outlet/>
    </div>

    </>
  )
}
