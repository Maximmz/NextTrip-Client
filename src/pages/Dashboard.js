import React, {useState, useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import "../styles/Dashboard.css";
import { AuthContext } from "../hooks/AuthContext";

const Dashboard = () => {
    const userr = JSON.parse(localStorage.getItem('user'));
    const { user, dispatch } = useContext(AuthContext);
    const [showHotel, setShowHotel] = useState(false);
    const navigate = useNavigate();
  
    const handleClick = async () => {

        dispatch({ type: "LOGOUT" });
        navigate('/');
      };
      const handleNav = () => {
        navigate(`/hotel/${userr.manager}`)
      }
      useEffect(()=> {
        if(userr.manager)
        {//Show the hotel span if the user is shown as a manager of a specific hotel.
            setShowHotel(true);
        }
      },[showHotel])

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      <p>Name: <span>{userr.username}</span></p>
      <p>Email: <span>{userr.email}</span></p>
      {showHotel &&<p> Go to your Hotel: <span onClick={handleNav}>{userr.manager}</span></p>}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Dashboard;