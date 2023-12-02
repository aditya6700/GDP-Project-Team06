import React from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import { logoutRoute } from '../utils/ApiRoutes';

export const Logout = ({userId}) => {

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "light", 
  };

  const handleLogout = () => {
    axios.get(`${logoutRoute}/${userId}`, {
      withCredentials: true,
      "Accept": "application/json",
      "Content-Type": "application/json"
    })
      .then((res) => {
        toast.success('Successfully logged out', toastOptions);
        navigate('/login', { replace: true });
        if (res.status !== 200) {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Logout Failed!!', toastOptions);
      });
  }

  return (
    <>
      <NavLink className="nav-link" onClick={handleLogout}>Logout</NavLink>
    </>
  )
}