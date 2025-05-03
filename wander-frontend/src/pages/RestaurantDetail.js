// src/pages/RestaurantDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import FaRegStar for empty stars
import './PlaceDetail.css';

const RestaurantDetail = () => {
  const { id, restaurant } = useParams();
  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tours/${id}/restaurants/${restaurant}`);
        const contentType = response.headers.get("Content-Type");

        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Expected JSON, got: ${contentType}. Response: ${text}`);
        }

        const data = await response.json();
        setRestaurantDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetail();
  }, [id, restaurant]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p>Error: {error}</p></div>;

  // Ensure restaurantDetail is properly populated
  const hasReviews = restaurantDetail && restaurantDetail.userReviews && restaurantDetail.userReviews.length > 0;

  return (
    <div className="container">
      <h2 className="header-title">Explore Restaurants</h2>
      <div className="card">
        <img
          src={restaurantDetail.image}
          alt={restaurantDetail.name}
          className="place-image"
        />
        <div className="inner-container">
          <h3 className="place-name">{restaurantDetail.name}</h3>
          <p className="place-address">{restaurantDetail.address || 'No address available'}</p>

          <div className="rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                i < Math.round(restaurantDetail.rating || 4.8) ? (
                  <FaStar key={i} className="filled-star" /> // Apply class for filled stars
                ) : (
                  <FaRegStar key={i} className="empty-star" /> // Apply class for empty stars
                )
              ))}
            </div>
            <span className="review-text">{hasReviews ? `${restaurantDetail.userReviews.length} Reviews` : 'No Reviews Yet'}</span>
          </div>

          <div className="tab-toggle">
            <button
              className={activeTab === 'about' ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button
              className={activeTab === 'review' ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveTab('review')}
            >
              Reviews
            </button>
          </div>

          {activeTab === 'about' ? (
            <>
              <h4 className="section-title">Description</h4>
              <p className="description">{restaurantDetail.description || "No description available."}</p>
            </>
          ) : (
            <>
              <h4 className="section-title">Reviews</h4>
              {hasReviews ? (
                restaurantDetail.userReviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <div className="review-user">
                        <div className="review-avatar">{review.username[0]}</div>
                        <span className="review-username">{review.username}</span>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          i < Math.round(review.rating) ? (
                            <FaStar key={i} className="filled-star" /> // Apply class for filled stars
                          ) : (
                            <FaRegStar key={i} className="empty-star" /> // Apply class for empty stars
                          )
                        ))}
                      </div>
                    </div>
                    <p className="review-text">{review.review}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </>
          )}

          <button className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
