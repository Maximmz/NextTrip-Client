import React from 'react';

const GoogleMap = ({ location,area }) => {
    const url = "https://maps.google.com/maps?q="+location+area+"pakistan&t=&z=10&ie=UTF8&iwloc=&output=embed"
  return (
    <div className="map-container">
      <iframe
        title="Google Map"
        src={url}
        width="100%"
        height="370px"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
