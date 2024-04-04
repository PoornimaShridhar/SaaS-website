import React, { useState, useEffect} from 'react';
import './HomePage.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineHotel } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { RiFunctionLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from "react-icons/fa";


const HomePage = () => {
  const [boxSize, setBoxSize] = useState({ width: '90vm', height: 'auto' });
  const [imageData, setImageData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  
  const handleAll = () => {
    setSelectedCategory('');
    setSearchInput('');
    setFilteredData(imageData);
  };

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleCategoryButtonClick = (category) => {
    // setSelectedCategory(category);
    setSelectedCategory(category);
    setSearchInput('');
    const filtered = imageData.filter(item => item.category === category);
    setFilteredData(filtered);
  };
    
  const handleResize = () => {
    setBoxSize({
      width: '90vm', 
      height: 'auto', 
    }); 
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); 
    const decimalStar = rating - fullStars; 
  
    // Render full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} style={{ color: 'orange', fontSize: '24px' }} />);
    }
  
    // Render partial star if decimal part exists
    if (decimalStar > 0) {
      // Calculate the width of the clipped area based on the decimal part
      const clipWidth = `${(1 - decimalStar) * 100}%`;
      stars.push(<FaStar key="partial" style={{ color: 'orange', fontSize: '24px', clipPath: `inset(0 ${clipWidth} 0 0)` }} />);
    }
  
    // Render empty stars for remaining space
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} style={{ color: 'white', fontSize: '24px' }} />);
    }
  
    return stars;
  };

  // Fisher-Yates (Knuth) Shuffle algorithm
  function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  


  useEffect(() => {
    fetch('/image.json')
      .then(response => response.json())
      .then(data => {
        // Shuffle the data
        const shuffledData = shuffleArray(data);
        setImageData(data); 
        setFilteredData(data);})
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

  const handleReload = () => {
    window.location.reload();
  };

  const handleNavigateToPlanPage = () => {
    navigate('/plan'); 
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    // Check if the input value is not empty
    if (inputValue.trim() !== '') {
        // Filter images whose names include the inputValue substring
        const filtered = imageData.filter(image => 
            image.name.toLowerCase().includes(inputValue)
        );
        setFilteredData(filtered);
    } else {
        // If the input is empty, show all images
        setFilteredData(imageData);
    }
};

const handleImageClick = (imageId) => {
  navigate(`/info/${imageId}`); 
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

            <h2 onClick={handleReload} style={{ marginTop: '5px', cursor: 'pointer', color: '#FF4F00'}} >
            Home
            </h2>

            <span style={spaceStyle}></span>

            <h2 style={{ marginTop: '5px', cursor: 'pointer'}} onClick={handleNavigateToPlanPage} >
            Plan
            </h2>

            <span style={spaceStyle}></span> 
        </div>     
      </header>

      <div className="img-container" style={boxSize}>
        <img src="/HomePageMain.jpg" alt="SGTour" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
      </div>
      
      <nav className="navigation-bar">
        <div className="search-container" style={{marginBottom: '0px'}}>
          <FaMagnifyingGlass style={{ padding: '0 10px 0 20px'}}/>
          <input 
              type="text" 
              placeholder="Search..." 
              value={searchInput}
              onChange={handleSearchInputChange}/>
        </div>
      </nav>

      <div style={{ textAlign: 'centre', paddingBottom: '20px', paddingTop: '1px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px'}}>
          <RiFunctionLine style={{ fontSize: '27px' }} onClick={() => handleAll()}/>
          
          <button className="btn" 
          onClick={() => handleCategoryButtonClick('food')} 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 5%', borderRadius: '30px', backgroundColor: '#F7F4F4', color: 'black', fontSize: '15px' }}>
          <IoFastFoodOutline size={20} color='black' style={{ marginRight: '10px' }} /> 
          <h3 style={{ fontSize: '15px', margin: 0, display: 'inline-block' }}> Food </h3>
          </button>

          <button className="btn" 
          onClick={() => handleCategoryButtonClick('hotel')} 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 5%', borderRadius: '30px', backgroundColor: '#F7F4F4', color: 'black', fontSize: '15px' }}>
          <MdOutlineHotel size={20} color='black' style={{ marginRight: '10px' }} />
          <h3 style={{ fontSize: '15px', margin: 0, display: 'inline-block' }}> Hotel </h3>
          </button>

          <button className="btn" 
          onClick={() => handleCategoryButtonClick('landscape')} 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 5%',borderRadius: '30px', backgroundColor: '#F7F4F4', color: 'black', fontSize: '15px' }}>
          <IoCameraOutline size={20} color='black' style={{ marginRight: '10px' }} /> 
          <h3 style={{ fontSize: '15px', margin: 0, display: 'inline-block' }}> landscape </h3>
          </button>

          <button className="btn" 
          onClick={() => handleCategoryButtonClick('shopping')} 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 5%',borderRadius: '30px', backgroundColor: '#F7F4F4', color: 'black', fontSize: '15px' }}>
          <CiShoppingCart size={20} color='black' style={{ marginRight: '10px' }} /> 
          <h3 style={{ fontSize: '15px', margin: 0, display: 'inline-block' }}> Shopping </h3>
          </button>

        </div>
      </div>
    <div>
    
    <div style={{overflowX: 'auto' }}>
    {chunkArray(filteredData, 3).map((row, rowIndex) => (
      <div key={rowIndex} className="post-container" >
        {row.map(image => (
          <div key={image.id} className="post-column" onClick={() => handleImageClick(image.id)}>
            <img src={image.src} alt={image.alt} style={{ width: '300px', height: '200px' }} />
            <p className="image-name">{image.name}</p>
            <div className="rating">
              {renderStars(image.rating)}
            </div>
          </div>
        ))}
      </div>
    ))}
    </div>
    </div>
  </div>
  );
};  

export default HomePage;