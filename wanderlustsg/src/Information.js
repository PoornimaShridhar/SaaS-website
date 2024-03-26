import React, { useState, useEffect } from 'react';
import './Information.css';
import { FaRegUser } from "react-icons/fa";
import HomePage from './HomePage';
import { GrLocation } from "react-icons/gr";
import { Link } from 'react-router-dom'; // Import Link
import { MdBorderRight } from 'react-icons/md';

const spaceStyle = {
  margin: '15px', // Adjust the space between the elements as needed
};

const handleReload = () => {
  window.location.reload(); // Reload the current page
};

const styles = {
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
    zIndex: '999'
  },
  displayBlock: {
    display: 'block'
  },
  displayNone: {
    display: 'none'
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
};

const InformationPage = () => {
  return (
    <div>
      <header style={headerStyle} >
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
      <div style={{height:"100vh"}}>
            <img src="./merlion.jpg" style={{ width: '80%', height: '80%', padding:"0", marginLeft:"10vw"}} />
            <h1 style={{marginLeft:"16vw", color:"black", marginTop:"2vh"}}>Merlion
                <GrLocation style={{marginLeft:"38vw"}} size={25}/>
                One Fullerton
                Ticket price: 0        
            </h1>
            <div style={{marginLeft:"16vw", marginRight:"13vw", marginTop:"3vh"}}>
            
                The Merlion, a symbol synonymous with Singapore, stands as a majestic embodiment of the city-state's rich cultural heritage and modern aspirations.
                This mythical creature, with the head of a lion and the body of a fish, symbolizes Singapore's ancient origins as a fishing village
                (represented by the fish tail) and its transformation into a roaring lion of economic prosperity and progress.
                Designed by the late Singaporean sculptor Lim Nang Seng, the original Merlion statue was unveiled in 1972 at the mouth of the Singapore River. 
                Over the years, it has become an iconic landmark, attracting millions of visitors from around the world.
            </div>
      </div>    
    </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
  // borderBottom: '1px solid #ccc',
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

export default InformationPage;