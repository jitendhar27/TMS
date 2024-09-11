import { useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Set the user's role upon login
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null); // Reset userRole on logout
  };

  return { isLoggedIn, userRole , login, logout };
}
