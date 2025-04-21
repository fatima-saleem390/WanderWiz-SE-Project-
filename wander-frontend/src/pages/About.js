import React from 'react';
import './About.css';
import bannerImg from '../assets/AboutUs.jpg';
import boatsImg from '../assets/boats.jpg';
import reviewIcon from '../assets/weatherr.jpg';
import tourIcon from '../assets/tour guide.jpg';
import itineraryIcon from '../assets/customization.jpg';

const About = () => {
  return (
    <div className="about-page">
      {/* Banner */}
      <div className="about-banner">
        <img src={bannerImg} alt="Banner" className="banner-image" />
        <h1 className="banner-title">
  About <span className="highlight">Us</span>
</h1>
      </div>

      {/* Who We Are */}
      <section className="about-section who-we-are">
        <div className="text-content">
          <h2>Who <span className="highlight">We Are?</span></h2>
          <p>
            We’re all about crafting unforgettable experiences for our explorers—moments that
            leave lasting impressions and stories worth sharing.What started as a simple passion 
            for discovering the breathtaking landscapes, vibrant cultures, and hidden gems of Pakistan 
            has evolved into a mission to connect travelers with the heart and soul of this incredible 
            country. From the majestic peaks of the north to the rich heritage sites in the south, our 
            journey is driven by a deep love for exploration and a commitment to making every adventure 
            meaningful, immersive, and truly one-of-a-kind.


          </p>

          <h2>Our <span className="highlight">Mission</span></h2>
          <p>
            We believe that travel isn’t just about ticking places off a list—it’s about truly immersing 
            yourself in new cultures, forming real connections with nature, and creating meaningful memories 
            that stay with you long after the journey ends. It’s the little moments, the unexpected encounters, 
            and the sense of wonder that make every trip unforgettable.
          </p>
        </div>
        <img src={boatsImg} alt="Boats" className="about-image" />
      </section>

      {/* Services */}
      <section className="services-section">
        <h3>We offer our best services</h3>
        <div className="services-grid">
          <div className="service-card">
          <div className="card-content">
            <img src={reviewIcon} alt="Review Icon" className="service-img" />
            <h4>Review & Bookmark System</h4>
          </div>
          <p className="card-subtext">
    Get inspired by real traveler reviews and save <br />
    your favorite spots for later.
  </p>
</div>
         
          <div className="service-card">
          <div className="card-content">
            <img src={tourIcon} alt="Tour Guide Icon" className="service-img" />
            <h4>Curated Tourist Attractions</h4>
          </div>
          <p className="card-subtext">
    Browse a rich, categorized database of top-rated 
    destinations
  </p>
  </div>
          <div className="service-card">
          <div className="card-content">
            <img src={itineraryIcon} alt="Itinerary Icon" className="service-img" />
            <h4>Itinerary Builder</h4>
          </div>
          <p className="card-subtext">
    Build your perfect trip plan from scratch, customizing
     every detail to suit your travel preferences.
  </p>
</div>
        </div>
      </section>
    </div>
  );
};

export default About;
