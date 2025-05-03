import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './PlaceDetail.css';

const HistoricalPlaceDetail = () => {
  const { id, place } = useParams();
  const [historicalPlaceDetail, setHistoricalPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [submitting, setSubmitting] = useState(false);

  const [newReview, setNewReview] = useState({
    username: '',
    review: '',
    rating: 0
  });

  // Fetch historical place details
  const fetchHistoricalPlaceDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/tours/${id}/historical-places/${place}`);
      const data = await res.json();
      setHistoricalPlaceDetail(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalPlaceDetail();
  }, [id, place]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value) => {
    setNewReview(prev => ({ ...prev, rating: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(newReview);
    console.log("Decoded historical place name:", place);
    const encodedPlaceName = encodeURIComponent(place);

    try {
      const res = await fetch(`http://localhost:5000/api/tours/${id}/historical-places/${encodedPlaceName}/userReviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });

      if (!res.ok) throw new Error("Failed to submit review.");

      await fetchHistoricalPlaceDetail();
      setNewReview({
        username: '',
        review: '',
        rating: 0
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = () => {
    alert("Saved to bookmarks (feature coming soon)!");
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p>Error: {error}</p></div>;

  if (!historicalPlaceDetail) return <div className="container"><p>No data available.</p></div>;

  const { name, image, address, rating, description, userReviews, location } = historicalPlaceDetail;
  const hasReviews = userReviews && userReviews.length > 0;

  return (
    <div className="container">
      <h2 className="header-title">Explore Historical Places</h2>
      <div className="card">
        <img src={image} alt={name} className="place-image" />
        <div className="inner-container">
          <h3 className="place-name">{name}</h3>
          <p className="place-address">{address || 'No address available'}</p>

          <div className="rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) =>
                i < Math.round(rating || 4.8)
                  ? <FaStar key={i} className="filled-star" />
                  : <FaRegStar key={i} className="empty-star" />
              )}
            </div>
            <span className="review-text">{hasReviews ? `${userReviews.length} Reviews` : 'No Reviews Yet'}</span>
          </div>

          <div className="tab-toggle">
            <button className={activeTab === 'about' ? 'tab-button active' : 'tab-button'} onClick={() => setActiveTab('about')}>
              About
            </button>
            <button className={activeTab === 'review' ? 'tab-button active' : 'tab-button'} onClick={() => setActiveTab('review')}>
              Reviews
            </button>
          </div>

          {activeTab === 'about' ? (
            <>
              <h4 className="section-title">Description</h4>
              <p className="description">{description || "No description available."}</p>
              {location && (
                <div className="location-section">
                  <h4 className="section-title">Location</h4>
                  <p>Latitude: {location.lat}</p>
                  <p>Longitude: {location.lng}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <h4 className="section-title">Reviews</h4>
              {hasReviews ? (
                userReviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <div className="review-user">
                        <div className="review-avatar">{review.username[0]}</div>
                        <span className="review-username">{review.username}</span>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) =>
                          i < Math.round(review.rating)
                            ? <FaStar key={i} className="filled-star" />
                            : <FaRegStar key={i} className="empty-star" />
                        )}
                      </div>
                    </div>
                    <p className="review-text">{review.review}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}

              <form className="review-form" onSubmit={handleReviewSubmit}>
                <h4 className="section-title">Add Your Review</h4>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  value={newReview.username}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="review"
                  placeholder="Write a review..."
                  value={newReview.review}
                  onChange={handleInputChange}
                  required
                />
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map(num => (
                    <span
                      key={num}
                      onClick={() => handleRatingChange(num)}
                      style={{ cursor: 'pointer', color: num <= newReview.rating ? '#ffc107' : '#ccc' }}
                    >
                      {num <= newReview.rating ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
                <button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </>
          )}

          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalPlaceDetail;
