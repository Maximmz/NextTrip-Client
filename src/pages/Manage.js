import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import "../styles/Manage.css";



function Manage() {
    const [adm, setAdm] = useState(false);
    const [showData, setShowData] = useState(false);
        const user = JSON.parse(localStorage.getItem('user'));
        const {id} = useParams();
        const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/find/${id}`);
        
        const navigate = useNavigate();
   
        useEffect(() => {
            try {
              async function checkAdm() {
        
                if(user && user.token){
                try {
                const res = await fetch(`http://localhost:8800/api/users/checkadmin/${user._id}`, {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.token}`
                    }, credentials: "include"
                  });
                  if (res.ok) { // Check if response is successful 
                    const data2 = await res.json();
                    
                    if (data2) {
                      setAdm(true);
                    } else {
                      
                      setAdm(false);
                      
                    }
                  } else {
                    navigate('/');
                    // Handle error response from backend, e.g. setAdm(false) or show error message
                    console.error("Error fetching data from backend:", res.status);
                  } }
            catch(err) {
            return err;
            }
                }
            }
            checkAdm();
            
          }catch(err){}
          
          }, [user])
          useEffect(()=> {//Run if function if adm is true, meaning the previous checkadmin runs as true.
            if(adm)
            {//If hotel admin and user id is same we show button
              if(user._id === data.admin) {
                setShowData(true);
              }
            
            }
          },[adm, data.admin, user])


          return (
           <div className="manage">
             {showData && <div className="textt"></div> }
          </div>
   )
    

}

export default Manage;