import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ isLoggedIn }) {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
  };

  const LinkStyles = ({ isActive }) => {
    return {
      textDecoration: 'none',
      fontWeight: isActive ? 'bold' : 'normal',
    };
  };

  const divStyle = {
    backgroundColor: '#BEFFF7',
  };

  return (
    <div style={divStyle}>
      <nav className="primary-nav" style={navStyle}>
        <NavLink to="/" style={LinkStyles} exact>
          HOME
        </NavLink>
        
        {isLoggedIn && (
          <>
            <NavLink to="/tours" style={LinkStyles}>
            TOURS
          </NavLink>
            <NavLink to="/hotelier" style={LinkStyles}>
              HOTELIER
            </NavLink>
            <NavLink to="/customer" style={LinkStyles}>
              CUSTOMER
            </NavLink>
            <NavLink to="/feedback" style={LinkStyles}>
              REVIEWS
            </NavLink>
            <NavLink to="/qna" style={LinkStyles}>
              QnA
            </NavLink>
          </>
        )}
        <NavLink to="/register" style={LinkStyles}>
          REGISTER
        </NavLink>
        {isLoggedIn ? (
          <NavLink to="/logout" style={LinkStyles}>
            LOGOUT
          </NavLink>
        ) : (
          <NavLink to="/login" style={LinkStyles}>
            LOGIN
          </NavLink>
        )}
      </nav>
    </div>
  );
}
