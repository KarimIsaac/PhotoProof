import React from 'react';
import ImageSlider from './ImageSlider';
const AboutUs = () => {
  return (
    <><div className="about">
      <h2 className='about1'>ABOUT </h2>
      <h2 className="about1">US</h2>
      <div className="stats">
        <div className="stat">
          <p>+10 Years</p>
          <span>Experience</span>
        </div>
        <div className='line1'></div>
        <div className="stat">
          <p>+450</p>
          <span>Customers</span>
        </div>
        <div className='line2'></div>
        <div className="stat">
          <p>+15K</p>
          <span>Portfolio Photos</span>
        </div>
        <div className='line3'></div>
      </div>
      <ImageSlider />
    </div>
    <div className='get-more'>
      <h1 className='get-more-info'>Get more info other discount prices</h1>
      <button className='submit-footer'>Submit</button>
      <input type='text'
      
      placeholder='enter your email address'
      ></input>
      <p className='by-clickng'>* By clicking “Submit” button, you agree to our Terms and that you have read our Data Use Policy.</p>
      <p className='footer-text'></p>
      </div></>
  );
};

export default AboutUs;
