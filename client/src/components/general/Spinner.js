import React from 'react';
import Rhombus from '../Images/Rhombus.gif';

function Spinner() {
  const containerStyle = {
    textAlign: 'center',
    position: 'absolute',
    top: '70%',
    left: '43%',
  };

  // Media query for medium and larger devices
  if (window.innerWidth >= 768) {
    containerStyle.top = '85%'; 
    containerStyle.left = '48%';
  }

  return (
    <div style={containerStyle}>
      <img src={Rhombus} alt="loading"  />
    </div>
  );
}

export default Spinner;
