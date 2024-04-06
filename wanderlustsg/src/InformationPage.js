import React, { useState, useEffect } from 'react';
import './InformationPage.css';
import { GrLocation } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineCursorClick } from "react-icons/hi";



const InformationPage = () => {
  const [boxSize, setBoxSize] = useState({ width: '90vm', height: 'auto' });
  const { imageId } = useParams();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const safeImage = image || { category: '', id: null };

  const relatedImages = imageData
    .filter(img => img.category === safeImage.category && img.id !== safeImage.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);


  const handleImageClick = (imageId) => {
    navigate(`/info/${imageId}`); 
  };

  const handleNavigateToHomePage = () => {
    navigate('/'); 
  };

  useEffect(() => {
    fetch('/image.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setImageData(data);})
      .catch(error => console.error('Error fetching image data:', error));
  }, []);

  useEffect(() => {
    const savedLikedState = JSON.parse(localStorage.getItem('liked'));
    if (savedLikedState !== null) {
      setIsLiked(savedLikedState);
    }
  }, []);

  const toggleLike = () => {
    const currentLikes = JSON.parse(localStorage.getItem('likes')) || [];
    console.log('Current Likes:', currentLikes);
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
  
    // If the image is now liked, add its ID to the array; otherwise, remove it
    const updatedLikes = newLikedState
      ? [...currentLikes, imageId]
      : currentLikes.filter(id => id !== imageId);
  
    // Save the updated array back to localStorage
    localStorage.setItem('likes', JSON.stringify(updatedLikes));
  
    // Optionally log the updated likes array to the console
    console.log('Updated Likes:', updatedLikes);
  };

  useEffect(() => {
    const currentLikes = JSON.parse(localStorage.getItem('likes')) || [];
    
    // Set the initial liked state based on whether imageId is in the currentLikes array
    setIsLiked(currentLikes.includes(imageId));
  
    fetch('/image.json')
      .then(res => res.json())
      .then(data => {
        const foundImage = data.find(img => img.id === parseInt(imageId));
        setImage(foundImage);
      })
      .catch(err => console.error("Could not load image data:", err));
  }, [imageId]);
  

  if (!image) return <div>Image not found</div>;

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

  const spaceStyle = {
    margin: '15px', 
  };

  const handleBack = () => {
    window.history.back(); 
  };

  
  const handleNavigateToPlanPage = () => {
    navigate('/plan'); 
  };

  const handleLocationClick = (postcode) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(postcode)}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <header style={headerStyle}>
        <div style={leftStyle}>
            <h1>WanderlustSG</h1>

            <span style={spaceStyle}></span>

            <h2 onClick={handleNavigateToHomePage } style={{ marginTop: '5px', cursor: 'pointer', color: '#FF4F00'}} >
            Home
            </h2>

            <span style={spaceStyle}></span>

            <h2 style={{ marginTop: '5px', cursor: 'pointer'}} onClick={handleNavigateToPlanPage} >
            Plan
            </h2>

            <span style={spaceStyle}></span> 
        </div>      
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <IoArrowBack onClick={handleBack} size={30} style={{ color: 'gray', marginLeft: '20px' }} />
        <div onClick={toggleLike} style={{ cursor: 'pointer' }}>
          {isLiked ? (
            <FaHeart size={30} style={{ color: '#ff4500', marginRight: '10px', marginLeft: '600px' }}/>
          ) : (
            <FaRegHeart size={30} style={{ color: '#ff4500', marginRight: '10px', marginLeft: '600px' }}/>
          )}
        </div>
      </div>

      
      <div key={image.id} className="img-container" style={boxSize}>
        <img src={image.src} alt="{image.alt}" style={{ width: '80%', height: '100%', objectFit: 'contain' }}/>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        gap: '10px', 
        width: 'calc(100% - 200px)', 
        marginLeft: '100px', 
        marginRight: '50px' 
        }}>
        <h3 style={{ margin: '5px 10px 5px 0', color: 'black' }}>{image.name}</h3>
        
        <div style={{ flexGrow: 1 }}></div>

        <h4 style={{ marginRight: '10px' }}>Ticket price: {image.price}</h4>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        width: 'calc(100% - 200px)', 
        marginLeft: '100px',
        gap: '10px' }}>
        <GrLocation size={25} onClick={() => handleLocationClick(image.location)} />
        <h2 style={{ margin: '0px' }}>{image.location}</h2>
      </div>

            
      <div style={{
        marginLeft: '100px',
        marginRight: '50px', 
        marginTop: '3vh',
        textAlign: 'start', 
        maxWidth: '1200px', 
      }}>
      {image.description}
      </div>
      <div style={{textAlign: 'center', marginTop: '20px'}}>
      {image.link ? (
        <>
        <a href={image.link} target="_blank" rel="noopener noreferrer" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          borderRadius: '15px', 
          backgroundColor: 'white', 
          color: '#FF4F00', 
          borderColor: '#FF4F00',
          borderWidth: '2px',
          borderStyle: 'solid',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Click for more information
        </a>
        <HiOutlineCursorClick style={{color: '#FF4F00', fontSize: '30px', marginLeft: '10px'}}/>
        </>
      ) : (
        <div style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          borderRadius: '15px', 
          backgroundColor: '#e9ecef', // Light grey background for disabled appearance
          color: '#6c757d', // Greyed out text
          border: '2px solid #6c757d', // Greyed out border
          textDecoration: 'none',
          fontWeight: 'bold',
          cursor: 'not-allowed', // Show the not-allowed cursor icon
        }}>
          Click for more information
        </div>
      )}
      
    </div>


      <div style={{
        marginLeft: '100px',
        marginRight: '50px', 
        marginTop: '30px',
        textAlign: 'start', 
        maxWidth: '1200px', 
      }}>
        <h4>Related:</h4>
        <div style={{ display: 'flex', overflowX: 'auto', marginTop: '20px' }}>
          {relatedImages.map((image) => (
            <div key={image.id} className="post-column" onClick={() => handleImageClick(image.id)} style={{ marginRight: '20px', flex: '0 0 auto' }}>
              <img src={image.src} alt={image.alt} style={{ width: '200px', height: '100px' }} />
              <p className="image-name">{image.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginBottom: "100px"}} ></div>
    </div>    

  );
};

export default InformationPage;