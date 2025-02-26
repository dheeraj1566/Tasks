import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Importing the default slideshow styles
import './App.css'; // If you have a custom style file

const Slideshow = () => {
  const images = [
    '/src/assets/image1.jpg',
    '/src/assets/image2.jpg',
    '/src/assets/image3.jpg',
  ];

  return (
    <div className="w-full max-w-screen-lg mx-auto py-8">
      <Slide>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
