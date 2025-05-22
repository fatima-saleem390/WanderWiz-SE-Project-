import React from 'react';
import './Gallery.css';

const galleryData = {
  historicalPlaces: [
    {
      image: 'https://pakistantravelplaces.com/wp-content/uploads/2020/11/HiranMinar.jpg',
      title: 'Hiran Minar',
      description: 'A historical architectural masterpiece located in Sheikhupura.',
    },
    {
      image: 'https://punjab.gov.pk/system/files/Lahore-Fort.jpg',
      title: 'Lahore Fort',
      description: 'A UNESCO World Heritage site and a symbol of Lahore’s grandeur.',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI1Hs5bv98XfEJ22kpWyEdHZo1Seg18Po7ig&s',
      title: 'Badshahi Mosque',
      description: 'One of the largest mosques in the world, built in Mughal architectural style.',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFw8BoAMNPrLlc47WohOD50-tcfHvewk4ig&s',
      title: 'Shalimar Gardens',
      description: 'A Mughal garden complex showcasing historical landscaping in Lahore.',
    },
  ],
  restaurants: [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKNE2-hA7sO_q2Bb3kJiC-I90Oimpw9Zs3ng&s',
      title: 'Spice Bazaar',
      description: 'A vibrant spot for traditional Pakistani cuisine.',
    },
    {
      image: 'https://www.desiblitz.com/wp-content/uploads/2020/08/20-Best-Restaurants-in-Pakistan-worth-visiting-f-685x336.jpg',
      title: 'The Salt Bae',
      description: 'Experience high-end steaks with a theatrical twist at Salt Bae restaurants.',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKW9c10ZZZi-Ex8iyw3j_kNt9ZDrtk5OqdQ&s',
      title: 'The Wok',
      description: 'Fusion dining with unique Asian flavors and a cozy atmosphere.',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdIhyCosl9nLV_P-eDC7Gjz05xwNZfpgHkhQ&s',
      title: 'Bundu Khan',
      description: 'A classic restaurant known for traditional barbecue and kebabs.',
    },
  ],
  hotels: [
    {
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/20/6f/e1/aa-islamabad-serena-hotel.jpg?w=1200&h=-1&s=1',
      title: 'Serena Hotel',
      description: 'A luxurious 5-star hotel in the heart of Islamabad.',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEjdkvGJAY4SwqFYBakkPUhOyZ3Ge9LshuQ&s',
      title: 'Pearl Continental',
      description: 'Top-notch facilities with beautiful surroundings in Rawalpindi.',
    },
    {
      image: 'https://cf.bstatic.com/static/img/theme-index/bg_luxury/869918c9da63b2c5685fce05965700da5b0e6617.jpg',
      title: 'Marriott Hotel',
      description: 'World-class services and incredible views in Karachi.',
    },
    {
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/b8/39/81/avari-towers-karachi.jpg?w=900&h=500&s=1',
      title: 'Avari Hotel',
      description: 'Elegant accommodation offering comfort and convenience in Lahore.',
    },
  ],
};

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h1>Explore Our Beautiful Collection</h1>

      {/* Historical Places Section */}
      <section className="gallery-section">
        <h2>Historical Places</h2>
        <div className="gallery-grid">
          {galleryData.historicalPlaces.map((item, index) => (
            <div key={index} className="gallery-item">
              <img src={item.image} alt={item.title} />
              <div className="overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="gallery-section">
        <h2>Restaurants</h2>
        <div className="gallery-grid">
          {galleryData.restaurants.map((item, index) => (
            <div key={index} className="gallery-item">
              <img src={item.image} alt={item.title} />
              <div className="overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels Section */}
      <section className="gallery-section">
        <h2>Hotels</h2>
        <div className="gallery-grid">
          {galleryData.hotels.map((item, index) => (
            <div key={index} className="gallery-item">
              <img src={item.image} alt={item.title} />
              <div className="overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;