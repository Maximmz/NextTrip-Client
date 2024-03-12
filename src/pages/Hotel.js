import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/Hotel.css';
import useFetch from '../hooks/useFetch';
import Calendar from '../components/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import GoogleMap from '../components/GoogleMap';
import RoomsTable from '../components/Table';

function Hotel() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();

  const [adm, setAdm] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data } = useFetch(`http://localhost:8800/api/hotels/find/${id}`);

  useEffect(() => {
    const checkAdm = async () => {
      if (user && user.token) {
        try {
          const userid = user._id;
          const res = await fetch(`http://localhost:8800/api/users/checkadmin/${userid}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            credentials: 'include',
          });
          const data2 = await res.json();
          if (data2) {
            setAdm(true);
          }
        } catch (err) {
          console.log('User');
        }
      }
    };

    if (user) {
      checkAdm();
    }
  }, [user]);

  useEffect(() => {
    if (adm && user?.id === data?.admin) {
      setShowBtn(true);
    }
  }, [adm, data?.admin, user]);

  const rooms = data.rooms;

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const fetchedRoomsData = [];

        for (const roomId of rooms) {
          const response = await fetch(`http://localhost:8800/api/rooms/${roomId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const roomData = await response.json();
          fetchedRoomsData.push(roomData);
        }

        setRoomsData(fetchedRoomsData);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching rooms data:', error);
        setLoading(false);
      }
    };

    if (rooms && rooms.length > 0) {
      fetchRoomsData();
    } else {
      setLoading(false);
    }
  }, [rooms]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const ImageSlider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const photos = data.photos;
    const currentImage = photos && photos.length > 0 ? `https://${photos[currentImageIndex]}` : '';
  
    const handlePreviousImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? photos.length - 1 : prevIndex - 1
      );
    };
  
    const handleNextImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    return (
      <div className="image-slider">
        {currentImage && <img src={currentImage} alt="Hotel" />}
        <div className="slider-buttons">
          <button
            onClick={handlePreviousImage}
            className="slider-button"
            disabled={!photos || photos.length <= 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={handleNextImage}
            className="slider-button"
            disabled={!photos || photos.length <= 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    );
  };
  

  console.log(roomsData);
  console.log(data);
  console.log(user)

  return (
    <div className="hotel-container">
      <div className="hotel-details">
        <Link to={`/destinations/${data.area}/hotels`} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </Link>
        <h1 className="hotel-name">{data.name}</h1>
        <ImageSlider />
        <h1 className="hotel-name">Rooms Available</h1>
        {roomsData.length > 0 ? (
          <RoomsTable rooms={roomsData} users={user} hotels={data} />
        ) : (
          <div>No rooms available</div>
        )}
      </div>

      <div className="hotel-sidebar">

        <div className="price">Prices starting at Rs. {data.cheapestPrice}</div>
        <div className="map-container">
          <GoogleMap location={data.name} area={data.area} />
        </div>
        <div className="sidebar-links">
          {showBtn && (
            <Link to={`/hotel/${data._id}/manage`}>
              <button className="manager-button">Manage Your Hotel</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hotel;
