import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skardu from "../components/Skardu";
import Swat from "../components/Swat";
import Hunza from "../components/Hunza";
import useFetch from "../hooks/useFetch";
import "../styles/Destination.css";

function Destination() {
  const { name } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("./hotels");
  };

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/countByArea?areas=${name}`
  );

  let destinationComponent;
  switch (name) {
    case "swat":
      destinationComponent = <Swat />;
      break;
    case "skardu":
      destinationComponent = <Skardu />;
      break;
    case "hunza":
      destinationComponent = <Hunza />;
      break;
    default:
      destinationComponent = <div>Destination not found</div>;
  }

  return (
    <div className="destination-container">
      <div className="destination-content">
        {destinationComponent}
        <button
          onClick={handleClick}
          className="hotel-count-button"
          disabled={loading}
        >
          {loading ? "Loading" : `${data} hotels`}
        </button>
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
}

export default Destination;
