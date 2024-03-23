import React, { useState, useEffect, useHistory} from 'react';
import './HomePage.css';
import PlanPage from './PlanPage';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BrowserRouter, Router, Route, Routes} from 'react-router-dom';
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineHotel } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { RiFunctionLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [boxSize, setBoxSize] = useState({ width: '90vm', height: 'auto' });

  const handleResize = () => {
    setBoxSize({
      width: '90vm', 
      height: 'auto', 
    }); 
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

  const handleReload = () => {
    window.location.reload(); // Reload the current page
  };

  return (
    <BrowserRouter>
    <div>
      <header style={headerStyle}>
        <div style={leftStyle}>
            <h1>WanderlustSG</h1>

            <span style={spaceStyle}></span>

            <h2 onClick={handleReload} style={{ marginTop: '5px', cursor: 'pointer', color: '#FF4F00'}} >
            Home
            </h2>

            <span style={spaceStyle}></span>

          {/* <h2 onClick={handleSwitch} style={{ marginTop: '5px', cursor: 'pointer'}} >
          Plan
          </h2> */}

            <Link to="/PlanPage" style={{textDecoration:"none"}}>
                <h2 style={{ marginTop: '5px', cursor: 'pointer' }}>
                Plan
                </h2>
            </Link>

          <span style={spaceStyle}></span> 
        </div>
          
      </header>

      <div className="img-container" style={boxSize}>
        <img src="/HomePageMain.jpg" alt="SGTour" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
      </div>
      
      <nav className="navigation-bar">
        <div className="search-container" style={{marginBottom: '0px'}}>
          <FaMagnifyingGlass style={{ padding: '0 10px 0 20px'}}/>
          <input type="text" placeholder="Search..." />
        </div>
      </nav>

      <div style={{ textAlign: 'centre', paddingBottom: '20px', paddingTop: '1px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '20px' }}>
          <RiFunctionLine style={{ fontSize: '24px' }} />
          <button className="btn" style={{ padding: '8px 30px', borderRadius: '30px', backgroundColor: '#F7F4F4', color: 'black', fontSize: '15px' }}><IoFastFoodOutline size={20} color='black' style={{ marginRight: '10px' }} /> <span class="align-middle" style={{ fontSize: '15px' }}> Food </span></button>
          <button className="btn" style={{ padding: '8px 30px', borderRadius: '30px', backgroundColor: '#F7F4F4', color: 'black', fontSize: '15px' }}><MdOutlineHotel size={20} color='black' style={{ marginRight: '10px' }} /> <span class="align-middle" style={{ fontSize: '15px' }}> Hotel</span></button>
          <button className="btn" style={{ padding: '8px 30px',borderRadius: '30px', backgroundColor: '#F7F4F4', color: 'black', fontSize: '15px' }}><IoCameraOutline size={20} color='black' style={{ marginRight: '10px' }} /> <span class="align-middle" style={{ fontSize: '15px' }}> Landscape </span></button>
          <button className="btn" style={{ padding: '8px 30px',borderRadius: '30px', backgroundColor: '#F7F4F4', color: 'black', fontSize: '15px' }}><CiShoppingCart size={20} color='black' style={{ marginRight: '10px' }} /> <span class="align-middle" style={{ fontSize: '15px' }}> Shooping </span></button>
        </div>
      </div>
      

      <div className="post-container">
        <div className="post-column">
          {/* Image 1 */}
          <img src="/1.jpg" alt="Post 1" />
          <p className="image-name">MBS</p>
        </div>
        <div className="post-column">
          {/* Image 2 */}
          <img src="/1.jpg" alt="Post 2" />
          <p className="image-name">MBS</p>
        </div>
        <div className="post-column">
          {/* Image 3 */}
          <img src="/1.jpg" alt="Post 3" />
          <p className="image-name">MBS</p>
        </div>
      </div>
    </div>
   </BrowserRouter>
  );
};  

export default HomePage;