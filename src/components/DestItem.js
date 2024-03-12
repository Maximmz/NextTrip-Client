import { Link } from 'react-router-dom';
import React from 'react';

function DestItem({ image, name, id }) {

  return (
    <div className="destItem">
      <div 
        style={{ 
          backgroundImage: `url(${image})`,
        }} 
      >
        <Link to={`/destinations/${name}`} >
          <button 
            className="destText"
            
          >
            {name}
          </button>
      
        </Link>
      </div>
    </div>
  );
}

export default DestItem;
