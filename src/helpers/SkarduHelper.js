import React from 'react';
import { SkarduData } from "./SkarduData";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../styles/ImageSlider.css";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const currentImage = images[currentImageIndex];

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="image-slider">
      <div className="slider-content">
        <div className="image-container">
          <img src={currentImage.image} alt={currentImage.description} />
        </div>
        <div className="text-container">
          <h1 className='image-title'>{currentImage.title}</h1>
          <p className="image-description">{currentImage.description}</p>
        </div>
      </div>
      <div className="slider-controls">
        <button
          className="slider-control prev"
          onClick={handlePrev}
          disabled={currentImageIndex === 0}
        >
          Previous
        </button>
        <button
          className="slider-control next"
          onClick={handleNext}
          disabled={currentImageIndex === images.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const SkarduHelper = () => {
  const [skarduData] = SkarduData;

  return (
    <div className="image-slider skardu-helper">
      <Link to="/destinations" className="link-button">
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back</span>
      </Link>
      <ImageSlider images={skarduData.images} />
    </div>
  );
};

export default SkarduHelper;
