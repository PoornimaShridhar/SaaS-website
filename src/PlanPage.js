import React, { useState, useEffect } from 'react';
import './PlanPage.css';
import { useNavigate } from 'react-router-dom';

const PlanPage = () => {
  const [boxSize, setBoxSize] = useState({ width: '90vm', height: 'auto' });
  const [imageData, setImageData] = useState([]);
  const [imageFilteredData, setImageFilteredData] = useState([]);
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [showInterestsPopup, setShowInterestsPopup] = useState(false);
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [likedImages, setLikedImages] = useState([]);
  const [planInitiated, setPlanInitiated] = useState(false);
  const combinedImages = [...selectedImages, ...likedImages.filter(li => !selectedImages.some(si => si.id === li.id))];
  const [plan, setPlan]=useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const likedIds = JSON.parse(localStorage.getItem('likes')) || [];
    const likedImages = imageData.filter(image => likedIds.includes(image.id.toString()));
    setLikedImages(likedImages);
  }, [imageData]); 

  
  const handlePlanButtonClick = () => {
    setShowPlanModal(true);
  };
  
  const handlePlanSubmit = async (event) => {
    // Handle submission of budget and days
    console.log('Budget:', budget);
    console.log('Days:', days);
    event.preventDefault();
    setShowPlanModal(false); 
    setPlanInitiated(true);
    setIsLoading(true);
    const likes = JSON.parse(localStorage.getItem('likes')) || [];

    console.log('Budget:', budget, 'Days:', days, 'Likes:', likes, 'Selected Images:', selectedImages);

    //send combinedImages + budget/days to backend, await reply
    const data = {
      budget: budget,
      days: days,
      combinedImages: combinedImages.map(image=>image.name).join(', ')
    };
    console.log('Data passed to backend:', data);

    try {
      const response = await fetch('/getPlan', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      if (!response.ok) {
          throw new Error('Failed to fetch plan');
      }
      const responseData = await response.json();
      setPlan(responseData);
      console.log('get plan:', responseData);
    } catch (error){
      console.error('Error fetching plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPlanModal(false);
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

  const handleInfo = (imageId) => {
    navigate(`/info/${imageId}`);
  };
  
  const handleAISubmit = (event) => {
    event.preventDefault();

    const selections = Object.entries(isChecked)
    .filter(([key, value]) => value)
    .map(([key]) => key.replace('checkbox', ''));
    
    console.log('Selection:', selections);
    const filteredImages = imageData.filter(image => selections.includes(image.choice));

    setImageFilteredData(filteredImages);

    localStorage.setItem('selectedChoices', JSON.stringify(selections));

    setShowInterestsPopup(false); 
  };

  useEffect(() => {
    // Attempt to retrieve saved selections
    const savedSelections = JSON.parse(localStorage.getItem('selectedChoices'));
    if (savedSelections) {
      const filteredImages = imageData.filter(image => savedSelections.includes(image.choice));
      setImageFilteredData(filteredImages);
    }
  }, [imageData]);
  

  const handleResize = () => {
    setBoxSize({
      width: '90vm', 
      height: 'auto', 
    });
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleNavigateToHomePage = () => {
    navigate('/'); 
  };

  const handleCleanAll = () => {
    localStorage.removeItem('selectedChoices');
    setImageFilteredData([]);
  };
  
  

  const handleAddButtonClick = (id) => {
    // Find the image in your dataset
    const imageToAdd = imageData.find(image => image.id === id);
    if (imageToAdd) {
        setSelectedImages(prev => [...prev, imageToAdd]);
        console.log('Add button clicked for image:', imageToAdd.name);
    }
    console.log('Add button clicked for images:', imageToAdd);
  };
  console.log('Add button clicked for images:', selectedImages);


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

  const handleCheckboxChange = (checkboxName) =>{
    setIsChecked(prevState => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName]
    }));
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
    checkbox10: false,
    checkbox11: false,
    checkbox12: false,
    checkbox13: false,
    checkbox14: false,
    checkbox15: false,
    checkbox16: false,
    checkbox17: false,
    checkbox18: false,
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
    height: '100%', 
  };

  const spaceStyle = {
    margin: '15px', 
  };

  return (
    <div>
      <header style={headerStyle}>
        <div style={leftStyle}>
          <h1>WanderlustSG</h1>

          <span style={spaceStyle}></span>

          <h2 onClick={handleNavigateToHomePage} style={{ marginTop: '5px' }} >
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
        <span style={{ fontSize: '20px' }}> Recommendation </span></button>

        <button className="btn" style={{ padding: '15px 30px',borderRadius: '30px', backgroundColor: '#FF4F00', 
        color: 'white', fontSize: '15px', border:'transparent', marginLeft: '250px'}} onClick={handleCleanAll}> 
        <span style={{ fontSize: '20px' }}> Clear All </span></button>
      </div>
      <span style={spaceStyle}></span>

      <div className="container">
      <div className="scrollable-content">
        {/* Render your rows here */}
          {imageFilteredData.map(image => (
          <div key={image.id} className="row">
          <img 
              src={process.env.PUBLIC_URL + image.src} 
              alt={image.name} 
              style={{ width: '100px', height: '100px' }}
            />
            <h2 onClick={()=>handleInfo(image.id)} style={{marginLeft: '50px'}}>{image.name}</h2>
            <button 
            onClick={()=>handleAddButtonClick(image.id)}
            disabled={selectedImages.some(selectedImage => selectedImage.id === image.id)} 
            style={{ padding: '10px 20px',borderRadius: '30px', 
            backgroundColor: selectedImages.some(selectedImage => selectedImage.id === image.id) ? '#D3D3D3' : '#FF4F00',
            color: 'white', fontSize: '15px', marginLeft: 'auto', outline:'none', border:'transparent'}}> 
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
    {isLoading ? (
      <div className="loading-container" style={{ textAlign: 'center', padding: '20px' }}>
        {/* Here you can add any loading animation you prefer */}
        <img src="/loading.gif" alt="Loading..." style={{ width: '200px', height: 'auto' }} />
        <h2 style={{color: 'black'}}>Loading...</h2>
      </div>
    ) : (
    <div className="gray-container" style={{margin: '20px', padding: '10px',}}>
    <div className="plan-text" style={{margin: '20px 10px'}}>
      {plan.split('\n').map((line, index) => {
        let style = {};
        if (index === 0) {
          style = { fontSize: '18px', fontWeight: 'bold', color: '#FF4F00', fontFamily: "'Aclonica', sans-serif"}; 
        } else if (line.includes('Day')) {
          style = { fontSize: '15px', fontWeight: 'bold', fontFamily: "'Aclonica', sans-serif" }; 
        } else {
          style = { fontSize: '15px'}; 
        }
        return (
          <p key={index} style={style}>{line}</p>
        );
      })}
    </div>
    </div>
    )}

    {showInterestsPopup && (
      <>
      <div className="overlay">
        <div className="popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999', color :"#00001C",  minWidth: '600px' }}>
          <div className="popup-content" style={{ backgroundColor: 'white', padding: '30px 60px', borderRadius: '15px' }}>
            <span className="close" onClick={handleInterestsPopupClose} style={{ fontSize: '30px' }}>&times;</span>
            <h1 style={{marginBottom: '10px', marginTop: '10px', color :"#00001C"}}>I am Interested in ... </h1>
            <h2 style={{fontSize:'2vw', marginBottom:"0.5vw", color :"#00001C"}}>Food</h2>
            <div className="checkbox-container" style={{color :"#00001C"}}>

            <div className="checkbox-container" style={{display:"flex", alignItems: "center"}}>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={isChecked.checkbox1}
                onChange={() => handleCheckboxChange('checkbox1')}
              />
              <label style={{marginRight:"25px", width: "60px" }}>Chinese</label>
        
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={isChecked.checkbox2}
                onChange={() => handleCheckboxChange('checkbox2')}
              />
              <label style={{marginRight:"25px", width: "80px"}}>Japanese</label>
        
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={isChecked.checkbox3}
                onChange={() => handleCheckboxChange('checkbox3')}
              />
              <label style={{marginRight:"15px"}}>Indian</label>
            </div>

            <div className="checkbox-container" style={{display:"flex", alignItems: "center"}}>
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={isChecked.checkbox4}
              onChange={() => handleCheckboxChange('checkbox4')}
            />
            <label style={{marginRight:"25px", width: "60px"}}>Malay</label>
       
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={isChecked.checkbox5}
              onChange={() => handleCheckboxChange('checkbox5')}
            />
            <label style={{marginRight:"25px", width: "80px"}}>Thailand</label>
            
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={isChecked.checkbox6}
              onChange={() => handleCheckboxChange('checkbox6')}
            />
            <label style={{}}>Vietnam</label>
          </div>

          <div className="checkbox-container" style={{display:"flex", alignItems: "center"}}>
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={isChecked.checkbox7}
            onChange={() => handleCheckboxChange('checkbox7')}
          />
          <label style={{marginRight:"25px", width: "60px"}}>Singapore</label>
        
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={isChecked.checkbox8}
            onChange={() => handleCheckboxChange('checkbox8')}
          />
          <label style={{ marginRight:"25px", width: "80px"}}>Western</label>
       
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={isChecked.checkbox9}
            onChange={() => handleCheckboxChange('checkbox9')}
          />
          <label style={{}}>Others</label>
        </div>
      </div>
            

      <h3 style={{fontSize:'2vw', marginBottom:"0.2vw", marginTop:"0.6vw"}}>Preference...</h3>
      <div className="checkbox-container" style={{display:"flex", alignItems: "center"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox10}
          onChange={() => handleCheckboxChange('checkbox10')}
        />
        <label style={{marginRight:"25px", width: "60px"}}>Culture</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox11}
          onChange={() => handleCheckboxChange('checkbox11')}
        />
        <label style={{marginRight:"25px", width: "80px"}}>City Walk</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox12}
          onChange={() => handleCheckboxChange('checkbox12')}
        />
        <label style={{}}>Shopping</label>
      </div>
      <div className="checkbox-container" style={{display:"flex", alignItems: "center"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox13}
          onChange={() => handleCheckboxChange('checkbox13')}
        />
        <label style={{marginRight:"25px", width: "60px"}}>Natural View</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox14}
          onChange={() => handleCheckboxChange('checkbox14')}
        />
        <label style={{marginRight:"25px", width: "80px"}}>History</label>
        
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox15}
          onChange={() => handleCheckboxChange('checkbox15')}
        />
        <label style={{}}>Educational</label>
      </div>
      <div className="checkbox-container" style={{display:"flex", alignItems: "center"}}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox16}
          onChange={() => handleCheckboxChange('checkbox16')}
        />
        <label style={{marginRight:"25px", width: "60px"}}>Local view</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox17}
          onChange={() => handleCheckboxChange('checkbox17')}
        />
        <label style={{marginRight:"25px", width: "80px"}}>Amuzement Park</label>
       
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isChecked.checkbox18}
          onChange={() => handleCheckboxChange('checkbox18')}
        />
        <label style={{}}>Landmark</label>
      </div>
      <button  onClick={handleAISubmit} style={{ marginTop:"2vh",padding: '15px 30px',borderRadius: '30px', backgroundColor: '#FF4F00', color: 'white', fontSize: '15px', border:'transparent', marginLeft: '0px'}}>Submit</button>
      </div>     
      </div>
    </div>
      </>
    )}
  
    {showPlanModal && (
      <>
      <div className="overlay">
        <div className="popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' }}>
          <div className="popup-content" style={{ backgroundColor: 'white', padding: '30px 60px', borderRadius: '15px' }}>
            <span className="close" onClick={handlePopupClose} style={{ fontSize: '30px' }}>&times;</span>
            <h1 style={{marginBottom: '20px', marginTop: '20px'}}>Plan Your Trip</h1>
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