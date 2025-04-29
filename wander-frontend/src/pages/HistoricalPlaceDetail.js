import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import FaRegStar for empty stars
import './PlaceDetail.css';

const HistoricalPlaceDetail = () => {
  const { id, place } = useParams();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tours/${id}/historical-places/${place}`);
        const contentType = response.headers.get("Content-Type");

        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Expected JSON, got: ${contentType}. Response: ${text}`);
        }

        const data = await response.json();
        setPlaceDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetail();
  }, [id, place]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p>Error: {error}</p></div>;

  // Ensure placeDetail is properly populated
  const hasReviews = placeDetail && placeDetail.userReviews && placeDetail.userReviews.length > 0;

  return (
    <div className="container">
      <h2 className="header-title">Explore Tourist Attractions</h2>
      <div className="card">
        <img
          src={placeDetail.image }
          alt={placeDetail.name}
          className="place-image"
        />
        <div className="inner-container">
          <h3 className="place-name">{placeDetail.name}</h3>
          <p className="place-address">{placeDetail.address || 'No address available'}</p>

          <div className="rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                i < Math.round(placeDetail.rating || 4.8) ? (
                  <FaStar key={i} className="filled-star" /> // Apply class for filled stars
                ) : (
                  <FaRegStar key={i} className="empty-star" /> // Apply class for empty stars
                )
              ))}
            </div>
            <span className="review-text">{hasReviews ? `${placeDetail.userReviews.length} Reviews` : 'No Reviews Yet'}</span>
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
              <p className="description">{placeDetail.description || "No description available."}</p>
            </>
          ) : (
            <>
              <h4 className="section-title">Reviews</h4>
              {hasReviews ? (
                placeDetail.userReviews.map((review, index) => (
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

export default HistoricalPlaceDetail;
