import React from 'react';
import './BgContainer.css';

const BgContainer = (props) => {
  return (
    <div className="bg-container">
      {props.children}
    </div>
  );
};

export default BgContainer;