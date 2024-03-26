import React, { useState, useEffect } from 'react';
import './PlanPage.css';

const PlanPage = () => {
  const [boxSize, setBoxSize] = useState({ width: '90vm', height: 'auto' });
  const [imageData, setImageData] = useState([]);
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showInterestsPopup, setShowInterestsPopup] = useState(false);

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

  const handleInterestsButtonClick = () => {
    setShowInterestsPopup(true);
  };

  const handleInterestsPopupClose = () => {
    setShowInterestsPopup(false);
  };

  const handleCheckboxChange = () =>{
    setIsChecked({ checkbox1:true});
  }

  const [isChecked, setIsChecked] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
    checkbox9: false,
  });


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
        <button className="btn" style={{ padding: '15px 50px',borderRadius: '30px', backgroundColor: '#FF4F00', 
        color: 'white', fontSize: '15px', border:'transparent'}} onClick={handleInterestsButtonClick}> 
        <span style={{ fontSize: '20px' }}> AI Recommendation </span></button>
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

    {showInterestsPopup && (
      <>
      <div className="overlay">
        <div className="popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999', color :"#00001C" }}>
          <div className="popup-content" style={{ backgroundColor: 'white', padding: '30px 60px', borderRadius: '15px' }}>
            <span className="close" onClick={handleInterestsPopupClose} style={{ fontSize: '30px' }}>&times;</span>
            <h1 style={{marginBottom: '10px', marginTop: '10px', color :"#00001C"}}>I am Interested in ... </h1>
            <div style={{fontSize:'1.3vw', marginBottom:"0.2vw", color :"#00001C"}}>Food</div>
            <div className="checkbox-container" style={{color :"#00001C"}}>
      <div className="column" style={{display:"flex"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox1}
          onChange={() => handleCheckboxChange('checkbox1')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"5vw"}}>Chinese</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox2}
          onChange={() => handleCheckboxChange('checkbox2')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"5vw"}}>Japanese</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox3}
          onChange={() => handleCheckboxChange('checkbox3')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{}}>Indian</label>
      </div>
      {/* <span style={{margin:"5px"}}></span> */}
      <div className="column" style={{display:"flex", marginTop:"0px"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox4}
          onChange={() => handleCheckboxChange('checkbox4')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"5.9vw"}}>Malay</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox5}
          onChange={() => handleCheckboxChange('checkbox5')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"5.2vw"}}>Thailand</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox6}
          onChange={() => handleCheckboxChange('checkbox6')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{}}>Vietnam</label>
      </div>
      <div className="column" style={{display:"flex"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox7}
          onChange={() => handleCheckboxChange('checkbox7')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"1.48vw"}}>Singapore local</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox8}
          onChange={() => handleCheckboxChange('checkbox8')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{ marginRight:"5.4vw"}}>Western</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox9}
          onChange={() => handleCheckboxChange('checkbox9')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{}}>Others</label>
      </div>
    </div>
            

    <div style={{fontSize:'1.3vw', marginBottom:"0.2vw", marginTop:"0.6vw"}}>Preference...</div>
            <div className="checkbox-container">
      <div className="column" style={{display:"flex"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox1}
          onChange={() => handleCheckboxChange('checkbox1')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"5vw"}}>Culture</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox2}
          onChange={() => handleCheckboxChange('checkbox2')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"5vw"}}>City Walk</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox3}
          onChange={() => handleCheckboxChange('checkbox3')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{}}>Shopping</label>
      </div>
      {/* <span style={{margin:"5px"}}></span> */}
      <div className="column" style={{display:"flex", marginTop:"0px"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox4}
          onChange={() => handleCheckboxChange('checkbox4')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"2.5vw"}}>Natural View</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox5}
          onChange={() => handleCheckboxChange('checkbox5')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"6vw"}}>History</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox6}
          onChange={() => handleCheckboxChange('checkbox6')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{}}>Educational</label>
      </div>
      <div className="column" style={{display:"flex"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox7}
          onChange={() => handleCheckboxChange('checkbox7')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{marginRight:"3.6vw"}}>Local view</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox8}
          onChange={() => handleCheckboxChange('checkbox8')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{ marginRight:"1.5vw"}}>Amuzement Park</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox9}
          onChange={() => handleCheckboxChange('checkbox9')}
          style={{margin:"5px 5px 5px"}}
        />
        <label style={{}}>Landmark</label>
      </div>
    </div>
            
            <button  style={{ marginTop:"2vh",padding: '15px 30px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px', border:'transparent', marginLeft: '40px'}}>Submit</button>
          </div>
        </div>
      </div>
      </>
    )}
  
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