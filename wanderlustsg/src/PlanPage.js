import React, { useState, useEffect } from 'react';
import './PlanPage.css';

const PlanPage = () => {
  const [boxSize, setBoxSize] = useState({ width: '90vm', height: 'auto' });
  const [imageData, setImageData] = useState([]);
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handlePlanButtonClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setBudget(value);
    }
  };
  
  const handleDaysChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setDays(value);
    }
  };

  const handlePlanSubmit = () => {
    // Handle submission of budget and days
    console.log('Budget:', budget);
    console.log('Days:', days);
    // You can add further logic here, such as sending the data to a backend server
    setShowPopup(false); // Close the popup after submission
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

  const handleAddButtonClick = () => {
    // Handle button click action here
    console.log('Add button clicked');
  };

  useEffect(() => {
    fetch('image.json')
      .then(response => response.json())
      .then(data => setImageData(data))
      .catch(error => console.error('Error fetching image data:', error));
  }, []);

  // Attach the event listener on component mount
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <button className="btn" style={{ padding: '15px 50px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px', border:'transparent' }}> <span style={{ fontSize: '20px' }}> AI Recommendation </span></button>
      </div>
      <span style={spaceStyle}></span>

      <div className="container">
      <div className="scrollable-content">
        {/* Render your rows here */}
          {imageData.map(image => (
          <div key={image.id} className="row">
          <img 
              src={process.env.PUBLIC_URL + image.src} 
              alt={image.name} 
              style={{ width: '100px', height: '100px' }}
            />
            <h2 style={{marginLeft: '50px'}}>{image.name}</h2>
            <button 
            onClick={handleAddButtonClick}
            style={{ padding: '10px 20px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px', marginLeft: 'auto', outline:'none', border:'transparent'}}> 
            Add
            </button>
          </div>
        ))}
      </div>
    </div>
    
    <div style={{ margin: '20px 20px', height: '1.5px', width: '95%', backgroundColor: '#FF4F00' }} />

    <div style={{ marginTop: '50px', marginLeft: '20px' }}>
      <button className="btn" onClick={handlePlanButtonClick} style={{ padding: '15px 50px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px', border:'transparent'}}> <span style={{ fontSize: '20px' }}> Plan </span></button>
    </div>
    
    <div style={{ position: 'relative' }}>
    <div className="gray-container" style={{margin: '20px'}}></div>
  
    {showPopup && (
      <>
      <div className="overlay">
        <div className="popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' }}>
          <div className="popup-content" style={{ backgroundColor: 'white', padding: '30px 60px', borderRadius: '15px' }}>
            <span className="close" onClick={handlePopupClose} style={{ fontSize: '30px' }}>&times;</span>
            <h1 style={{marginBottom: '10px', marginTop: '10px'}}>Plan Your Trip</h1>
            <div>
              <label htmlFor="budget" style={{marginRight: '10px'}}>Budget:</label>
              <input type="number" id="budget" value={budget} onChange={handleBudgetChange} style={{width:'100px'}}/>
            </div>
            <div>
              <label htmlFor="days" style={{marginRight: '10px'}}>Days:</label>
              <input type="number" id="days" value={days} onChange={handleDaysChange} style={{width:'100px'}}/>
            </div>
            <button onClick={handlePlanSubmit} style={{ padding: '15px 30px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px', border:'transparent', marginLeft: '40px'}}>Submit</button>
          </div>
        </div>
      </div>
      </>
    )}
      </div>
      
  </div>
  );
};

export default PlanPage;