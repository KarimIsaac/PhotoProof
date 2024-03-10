import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../Sass/ImageSlider.css'




const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 1'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Slide 2'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 3'
  },
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide duration={3000} transitionDuration={500}>
         {slideImages.map((slideImage, index)=> (
            <div className='slideshow' key={index} style={{ 'backgroundImage': `url(${slideImage.url})` }}>
              <span >{slideImage.caption}</span>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default Slideshow;