import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";
import "../styles/Login.css";
import styles from "../styles/Valid.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [isValid, setIsValid] = useState(true);

  

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if(e.target.value.trim().length>0) {
      setIsValid(true);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      const token = res.data.token;
      
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    
      
    }
  };


  return (
    <div className={`${styles['form-control']} ${!isValid ? styles.invalid : styles.valid}`}>
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <button disabled={loading} onClick={handleClick} className="rButton">
          Register?
        </button>
        
        {error && <span>{error.message}</span>}
      </div>
    </div>
    </div>
  );
};

export default Login;