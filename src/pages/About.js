import React from "react";
import MenuAsset from "../assets/MenuAsset.jpg";
import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MenuAsset})` }}
      >
        <div className="aboutOverlay">
          <h1 className="aboutTitle">ABOUT US</h1>
        </div>
      </div>
      <div className="aboutBottom">
        <div className="aboutContent">
          <h2 className="aboutSubtitle">Who We Are?</h2>
          <p className="aboutDescription">
            Welcome to NextTrip, your ultimate gateway to exploring the wonders
            of Pakistan. We are dedicated to showcasing the awe-inspiring
            beauty, vibrant culture, and diverse landscapes that make Pakistan a
            must-visit destination. At NextTrip, we are passionate about
            curating extraordinary travel experiences for adventurers, nature
            enthusiasts, and cultural explorers. Whether you're seeking
            adrenaline-pumping adventures in the rugged mountains of the
            Karakoram Range, immersing yourself in the ancient history of the
            Indus Valley Civilization, or indulging in the serenity of pristine
            beaches along the Arabian Sea, we are here to make your journey
            unforgettable. Our team of knowledgeable experts and local guides is
            committed to ensuring that you have an authentic and seamless travel
            experience. We provide personalized itineraries, insider tips, and
            top-notch services to cater to your unique preferences and
            interests. Join us on a remarkable journey as we unlock the hidden
            gems of Pakistan, allowing you to create lifelong memories and
            discover the NextTrip of your dreams. Let the adventure begin!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
