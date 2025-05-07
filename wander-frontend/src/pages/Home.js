//Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import pinkTree from '../assets/pinkTree.jpg';
import cowsForest from '../assets/cowsForest.jpg';
import faisalMosque from '../assets/faisalMosque.jpg';
import reviewIcon from '../assets/weatherr.jpg';
import tourIcon from '../assets/tour guide.jpg';
import itineraryIcon from '../assets/customization.jpg';



const Home = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        <button className="know-button">
          Know Before You Go <span className="globe">🌍</span>
        </button>

        <h1>
          Traveling opens the door to creating <span className="highlight">memories</span>
        </h1>

        <p>
          At our core, we believe in making things better — smarter, smoother, and more enjoyable.
          Whether it's solving a problem or building something new, we put our best into every step.
          No shortcuts, just honest work that speaks for itself.
        </p>
      </div>

      <div className="home-images">
        <img src={pinkTree} alt="Tree" className="home-image" />
        <img src={cowsForest} alt="Forest with cows" className="home-image" />
        <img src={faisalMosque} alt="faisalMosque" className="home-image" />
      </div>
      {/* Services */}
      <section className="services-section2">
  <h3>We offer our best services</h3>
  <div className="services-grid2">
    <Link to="/listing" className="service-card2-link">
      <div className="service-card2">
        <div className="card-content2">
          <img src={reviewIcon} alt="Review Icon" className="service-img" />
          <h4>Review & Bookmark System</h4>
        </div>
        <p className="card-subtext">
          Get inspired by real traveler reviews and save <br />
          your favorite spots for later.
        </p>
      </div>
    </Link>

    <Link to="/listing" className="service-card2-link">
      <div className="service-card2">
        <div className="card-content2">
          <img src={tourIcon} alt="Tour Guide Icon" className="service-img" />
          <h4>Curated Tourist Attractions</h4>
        </div>
        <p className="card-subtext">
          Browse a rich, categorized database of top-rated destinations.
        </p>
      </div>
    </Link>

    <Link to="/plan-trip" className="service-card2-link">
      <div className="service-card2">
        <div className="card-content2">
          <img src={itineraryIcon} alt="Itinerary Icon" className="service-img" />
          <h4>Itinerary Builder</h4>
        </div>
        <p className="card-subtext">
          Build your perfect trip plan from scratch, customizing every detail to suit your travel preferences.
        </p>
      </div>
    </Link>
  </div>
</section>
      {/* Places to Visit */}
<section className="places-section">
  <button className="explore-button">
    Explore<span className="globe">🔍</span>
    </button>
  <h3>Places to <span className="highlight">Visit</span>
  </h3>
  <div className="places-grid">
    <div className="place-card tall">
      <img src={require('../assets/anso.jpg')} alt="Anso Lake" />
      <div className="place-overlay">
        <h4>Anso Lake</h4>
        <p>-Kaghan-</p>
      </div>
    </div>

    <div className="place-card tall">
      <img src={require('../assets/badshahi.jpg')} alt="Badshahi Masjid" />
      <div className="place-overlay">
        <h4>Badshahi Masjid</h4>
        <p>-Lahore-</p>
      </div>
    </div>

    <div className="place-card wide">
      <img src={require('../assets/seaview.jpg')} alt="Sea View" />
      <div className="place-overlay">
        <h5>Sea View</h5>
        <p>-Karachi-</p>
      </div>
    </div>

    <div className="place-card">
      <img src={require('../assets/thal.jpg')} alt="Thal Desert" />
      <div className="place-overlay">
        <h6>Thal Desert</h6>
        <p>-Bhakkar-</p>
      </div>
    </div>

    <div className="place-card">
      <img src={require('../assets/monal.jpg')} alt="Monal" />
      <div className="place-overlay">
        <h6>Monal</h6>
        <p>-Islamabad-</p>
      </div>
    </div>

    
  </div>
</section>
{/* Fans Love Section */}
<section className="fans-love-section">
  <button className="tag-btn">Fans Love ❤️</button>
  <h3>What our fans say <span className="highlight">about us</span>
  </h3>
  <div className="testimonial-grid">
    <div className="testimonial-card">
      <p className="testimonial-text">
        WanderWhiz made my trip planning so simple and stress-free. Everything I needed was in one place — attractions, reviews, and a custom itinerary!
      </p>
      <div className="testimonial-user">
        <div className="user-img-placeholder" />
        <div className="user-info">
          <p className="user-name">Ali</p>
          <p className="user-role">Customer</p>
        </div>
      </div>
    </div>

    <div className="testimonial-card">
      <p className="testimonial-text">
        I love how easy it is to bookmark places and read tips from real travelers. It feels like having a personal travel guide in my pocket.
      </p>
      <div className="testimonial-user">
        <div className="user-img-placeholder" />
        <div className="user-info">
          <p className="user-name">Ayesha</p>
          <p className="user-role">Customer</p>
        </div>
      </div>
    </div>

    <div className="testimonial-card">
      <p className="testimonial-text">
        Planning a last-minute vacation used to be a nightmare, but not with WanderWhiz. It’s fast, smart, and actually fun to use!
      </p>
      <div className="testimonial-user">
        <div className="user-img-placeholder" />
        <div className="user-info">
          <p className="user-name">Ibrahim</p>
          <p className="user-role">Customer</p>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;