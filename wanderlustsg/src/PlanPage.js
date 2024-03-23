import React, { useState, useEffect } from 'react';
import './PlanPage.css';
import { FaRegUser } from "react-icons/fa";
import HomePage from './HomePage';

const PlanPage = () => {
  const [boxSize, setBoxSize] = useState({ width: '90vm', height: 'auto' });
  const [showMainPage, setShowMainPage] = useState(false);

  const handleOtherPage = () => {
    setShowMainPage(true);
  };

  const handleResize = () => {
    setBoxSize({
      width: '90vm', 
      height: 'auto', 
    });
  };

  const handleReload = () => {
    window.location.reload(); // Reload the current page
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    height: '30px',
  };

  const leftStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const rightStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '100%', // Ensures the container takes the full height of its parent
  };

  const spaceStyle = {
    margin: '15px', // Adjust the space between the elements as needed
  };


  // Attach the event listener on component mount
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAddButtonClick = () => {
    // Handle button click action here
    console.log('Add button clicked');
  };

  return (
    <div>
      <header style={headerStyle}>
        <div style={leftStyle}>
          <h1>WanderlustSG</h1>
          <span style={spaceStyle}></span>
          <h2 style={{ marginTop: '5px' }} >
          Home
          </h2>       
          <span style={spaceStyle}></span>
          <h2 onClick={handleReload} style={{ marginTop: '5px', color: '#FF4F00' }}>
            Plan
          </h2>
        </div>
      </header>
      <div style={{ marginTop: '50px', marginLeft: '20px' }}>
        <button className="btn" style={{ padding: '15px 50px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px' }}> <span style={{ fontSize: '20px' }}> AI Recommendation </span></button>
      </div>
      <span style={spaceStyle}></span>

      <div className="container">
      <div className="scrollable-content">
        {/* Render your rows here */}
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="row">
          <img 
          src={`${process.env.PUBLIC_URL}/${index + 1}.jpg`} 
          alt={`Image ${index + 1}`} 
          style={{ width: '200px', height: '100px' }}
          />
            <h2 style={{marginLeft: '50px'}}>{index + 1}</h2>
            <button 
            onClick={handleAddButtonClick}
            style={{ padding: '10px 20px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px', marginLeft: '350px'}}> 
            Add
            </button>
          </div>
        ))}
      </div>
    </div>
    
      <div style={{ margin: '20px 20px', height: '1.5px', width: '95%', backgroundColor: '#FF4F00' }} />

      <div style={{ marginTop: '50px', marginLeft: '20px' }}>
        <button className="btn" style={{ padding: '15px 50px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px' }}> <span style={{ fontSize: '20px' }}> Plan </span></button>
      </div>
      
    </div>
  );
};

export default PlanPage;