
import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
export default function Items() {
    
   
   useEffect(() => {
    Aos.init({ duration: 2000 });
   }, []);
    
  return (
    <div className='items'>
      <h1 className='home-header'>PhotoProofPro is an online proofing system enabling photographers to deliver beautiful, password protected galleries to their clients.</h1>
      <div className="grid-container">
      <div>
        <h1>Manage Your Clients</h1>
        <h4>Keep a record of your clients, shoots, and orders. See when they have viewed the proofs or shared the page with anyone.</h4>
      </div>
      <div>
        <h1>Individual Client Pages</h1>
        <h4>Your clients log on with a simple passcode you provide them, branded with your studio's look and feel.</h4>
      </div>
      <div>
        <h1>Mobile Friendly</h1>
        <h4>Your clients' proofing pages look and work beautifully on smartphones and tablets.</h4>
      </div>
      <div>
        <h1>Select Favorites</h1>
        <h4>Let your clients know which shot you think are the best. Allow them to share their proofs with their agents and friends for feedback to help narrow down their selections. Commenting and user ratings are configurable and optional for each gallery you create.</h4>
      </div>
      <div>
        <h1>Place Orders</h1>
        <h4>Once your client has made their selections, they can place an order with you. You are sent an email listing their choices and any special instructions.</h4>
      </div>
      <div data-aos="fade-up"  >
        <h1>Multilingual</h1>
        <h4>The client interface is available in several languages. If your language is not supported, contact us and we can add it.</h4>
      </div>
      </div>
    </div>
  )
}
