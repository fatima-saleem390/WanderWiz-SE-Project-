const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Other routes and logic...

// Sample tours data with reviews, historical places, restaurants, and hotels
const tours = [
  {
    id: 1,
    title: "Lahore",
    rating: 4.7,
    reviews: 120,
    image: "Lahore.jpg",
    historicalPlaces: [
      { 
        name: "Badshahi Mosque", 
        description: "Badshahi Mosque is one of the largest mosques in the world and a beautiful example of Mughal architecture.", 
        rating: 4.8, 
        reviews: 150, 
        image: "badshahi_mosque.jpg", 
        location: "Lahore, Punjab, Pakistan",
        userReviews: [
          { username: "JohnDoe", review: "A must-visit place! The architecture is stunning.", rating: 5 },
          { username: "JaneDoe", review: "Beautiful mosque but very crowded.", rating: 4 }
        ]
      },
      { 
        name: "Lahore Fort", 
        description: "The Lahore Fort is a historic fort in the city of Lahore, dating back to at least the 11th century.", 
        rating: 4.5, 
        reviews: 100, 
        image: "lahore_fort.jpg", 
        location: "Lahore, Punjab, Pakistan",
        userReviews: [
          { username: "Alice", review: "An amazing place to learn about Lahore's history!", rating: 5 },
          { username: "Bob", review: "Good but needs some restoration work.", rating: 3 }
        ]
      }
    ],
    restaurants: [
      { 
        name: "The Chaiwala", 
        description: "A popular tea house serving traditional Pakistani tea and snacks.", 
        rating: 4.6, 
        reviews: 120, 
        image: "chaiwala.jpg", 
        location: "MM Alam Road, Lahore",
        userReviews: [
          { username: "Mike", review: "Great place for tea lovers!", rating: 5 },
          { username: "Sara", review: "Love the snacks, but the tea could be better.", rating: 4 }
        ]
      },
      { 
        name: "Café Zouk", 
        description: "A contemporary café offering a wide variety of continental dishes in a cozy ambiance.", 
        rating: 4.7, 
        reviews: 85, 
        image: "cafe_zouk.jpg", 
        location: "MM Alam Road, Lahore",
        userReviews: [
          { username: "Tom", review: "Amazing continental food and excellent ambiance.", rating: 5 },
          { username: "Lily", review: "I loved the desserts here!", rating: 4 }
        ]
      }
    ],
    hotels: [
      { 
        name: "Pearl Continental", 
        description: "A luxurious 5-star hotel offering modern amenities and an exquisite view of the city.", 
        rating: 4.9, 
        reviews: 200, 
        image: "pearl_continental.jpg", 
        location: "Shahrah-e-Quaid-e-Azam, Lahore",
        userReviews: [
          { username: "David", review: "The best hotel in Lahore! Highly recommended.", rating: 5 },
          { username: "Emma", review: "Great hotel, but a bit pricey.", rating: 4 }
        ]
      },
      { 
        name: "Lahore Marriott", 
        description: "A top-tier hotel known for its elegant rooms and exceptional customer service.", 
        rating: 4.8, 
        reviews: 180, 
        image: "lahore_marriott.jpg", 
        location: "Mall Road, Lahore",
        userReviews: [
          { username: "Chris", review: "Luxury at its best. Worth every penny.", rating: 5 },
          { username: "Sophia", review: "Comfortable stay, though the food could be improved.", rating: 4 }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Karachi",
    rating: 4.5,
    reviews: 95,
    image: "Karachi.jpg",
    historicalPlaces: [
      { 
        name: "Mazar-e-Quaid", 
        description: "Mazar-e-Quaid is the resting place of Muhammad Ali Jinnah, the founder of Pakistan.", 
        rating: 4.9, 
        reviews: 250, 
        image: "https://media.istockphoto.com/id/1816070860/photo/mazar-e-quaid-jinnah-mausoleum-the-tomb-in-karachi-pakistan.jpg?s=1024x1024&w=is&k=20&c=7aDQvfNr3NIHwohNVVdT4nTjRKFbAnpFq3d7EpAFZcg=", 
        location: "M.A. Jinnah Road, Karachi",
        userReviews: [
          { username: "Ali", review: "A place full of historical significance. A must-visit!", rating: 5 },
          { username: "Zara", review: "Peaceful and serene, but very crowded on weekends.", rating: 4 }
        ]
      },
      { 
        name: "Karachi Marina Club", 
        description: "A picturesque club offering a serene view of the marina and a peaceful environment.", 
        rating: 4.7, 
        reviews: 90, 
        image: "karachi_marina_club.jpg", 
        location: "DHA Phase 8, Karachi",
        userReviews: [
          { username: "Omar", review: "Great place to relax with family.", rating: 5 },
          { username: "Lina", review: "Beautiful view, but the service could be better.", rating: 3 }
        ]
      }
    ],
    restaurants: [
      { 
        name: "Kolachi", 
        description: "A renowned restaurant known for its traditional seafood and authentic Karachi cuisine.", 
        rating: 4.8, 
        reviews: 150, 
        image: "kolachi.jpg", 
        location: "Do Darya, Karachi",
        userReviews: [
          { username: "Khan", review: "Best seafood in Karachi! Highly recommended.", rating: 5 },
          { username: "Mina", review: "The ambiance is amazing, but the service was slow.", rating: 4 }
        ]
      },
      { 
        name: "Chai Wala", 
        description: "A cozy café offering a variety of teas and light snacks, perfect for a relaxing hangout.", 
        rating: 4.6, 
        reviews: 120, 
        image: "chaiwala_karachi.jpg", 
        location: "Clifton, Karachi",
        userReviews: [
          { username: "Faisal", review: "Lovely place for tea and snacks!", rating: 5 },
          { username: "Hina", review: "Good place, but the tea could be better.", rating: 4 }
        ]
      }
    ],
    hotels: [
      { 
        name: "Pearl Continental Karachi", 
        description: "A luxury hotel with stunning views, premium facilities, and a serene atmosphere.", 
        rating: 4.7, 
        reviews: 220, 
        image: "pearl_continental_karachi.jpg", 
        location: "Club Road, Karachi",
        userReviews: [
          { username: "Ahmed", review: "Top-notch service and amazing view from the rooms!", rating: 5 },
          { username: "Sara", review: "Nice hotel, but the food could be improved.", rating: 4 }
        ]
      },
      { 
        name: "The Oberoi", 
        description: "A five-star hotel known for its lavish rooms and world-class amenities.", 
        rating: 4.9, 
        reviews: 300, 
        image: "the_oberoi.jpg", 
        location: "Near Clifton Beach, Karachi",
        userReviews: [
          { username: "Zaid", review: "Amazing hotel with impeccable service.", rating: 5 },
          { username: "Maya", review: "Very luxurious but the prices are steep.", rating: 4 }
        ]
      }
    ]
  },
  // Add similar data for other cities (Islamabad, Peshawar, etc.)

  {
    id: 3,
    title: "Islamabad",
    rating: 4.6,
    reviews: 105,
    image: "Islamabad.jpg",
    historicalPlaces: [
      { 
        name: "Faisal Mosque", 
        description: "Faisal Mosque is the largest mosque in Pakistan, located in the foothills of Margalla Hills.", 
        rating: 4.8, 
        reviews: 200, 
        image: "faisal_mosque.jpg", 
        location: "Margalla Hills, Islamabad",
        userReviews: [
          { username: "Ali", review: "A beautiful mosque with amazing views of the mountains.", rating: 5 },
          { username: "Kiran", review: "Spacious and serene, but can get crowded during peak times.", rating: 4 }
        ]
      },
      { 
        name: "Daman-e-Koh", 
        description: "A viewpoint in the Margalla Hills National Park that offers panoramic views of Islamabad.", 
        rating: 4.7, 
        reviews: 150, 
        image: "daman_e_koh.jpg", 
        location: "Margalla Hills National Park, Islamabad",
        userReviews: [
          { username: "Rizwan", review: "Breathtaking views of Islamabad, a must-see.", rating: 5 },
          { username: "Nina", review: "A peaceful place to relax with family.", rating: 4 }
        ]
      }
    ],
    restaurants: [
      { 
        name: "Monal Restaurant", 
        description: "Monal is a popular restaurant offering traditional Pakistani food with stunning views of the city.", 
        rating: 4.8, 
        reviews: 180, 
        image: "monal_restaurant.jpg", 
        location: "Pir Sohawa Road, Islamabad",
        userReviews: [
          { username: "Zahid", review: "The food and views are absolutely amazing!", rating: 5 },
          { username: "Mariam", review: "Great food but a little on the expensive side.", rating: 4 }
        ]
      },
      { 
        name: "The Chalet", 
        description: "A cozy café offering continental dishes and warm coffee.", 
        rating: 4.6, 
        reviews: 100, 
        image: "the_chalet.jpg", 
        location: "Saidpur Village, Islamabad",
        userReviews: [
          { username: "Ayesha", review: "Great ambiance, perfect for a cozy evening.", rating: 5 },
          { username: "Fahad", review: "Lovely place for coffee, but a bit pricey.", rating: 4 }
        ]
      }
    ],
    hotels: [
      { 
        name: "Islamabad Serena Hotel", 
        description: "A luxury hotel offering modern amenities, including fine dining and elegant rooms.", 
        rating: 4.9, 
        reviews: 250, 
        image: "serena_hotel.jpg", 
        location: "Khayaban-e-Suharwardy, G-5, Islamabad",
        userReviews: [
          { username: "Faizan", review: "Excellent stay, top-notch service!", rating: 5 },
          { username: "Saira", review: "Comfortable rooms but the food could be better.", rating: 4 }
        ]
      },
      { 
        name: "Pearl Continental Islamabad", 
        description: "A luxurious hotel offering premium services, perfect for business and leisure.", 
        rating: 4.8, 
        reviews: 200, 
        image: "pearl_continental_islamabad.jpg", 
        location: "The Mall Road, Rawalpindi (near Islamabad)",
        userReviews: [
          { username: "Sajid", review: "Fantastic service, would definitely visit again.", rating: 5 },
          { username: "Rida", review: "Great stay, but the check-in process could be faster.", rating: 4 }
        ]
      }
    ]
  },

  // Peshawar
  {
    id: 4,
    title: "Peshawar",
    rating: 4.4,
    reviews: 90,
    image: "Peshawar.jpg",
    historicalPlaces: [
      { 
        name: "Bala Hisar Fort", 
        description: "Bala Hisar Fort is a historic fort located in the city of Peshawar.", 
        rating: 4.7, 
        reviews: 130, 
        image: "bala_hisar_fort.jpg", 
        location: "Fort Road, Peshawar",
        userReviews: [
          { username: "Ali", review: "Great historical site, with lots of history to learn.", rating: 5 },
          { username: "Mehmood", review: "Good place, but the restoration work is still in progress.", rating: 4 }
        ]
      },
      { 
        name: "Peshawar Museum", 
        description: "Peshawar Museum houses a vast collection of historical artifacts and statues.", 
        rating: 4.6, 
        reviews: 115, 
        image: "peshawar_museum.jpg", 
        location: "Sher Shah Suri Road, Peshawar",
        userReviews: [
          { username: "Sara", review: "Very educational and informative museum.", rating: 5 },
          { username: "Asad", review: "Interesting collection but the museum could use some more space.", rating: 4 }
        ]
      }
    ],
    restaurants: [
      { 
        name: "Haji's Tandoor", 
        description: "A local restaurant famous for its tandoor dishes, especially the kebabs.", 
        rating: 4.5, 
        reviews: 80, 
        image: "hajis_tandoor.jpg", 
        location: "University Road, Peshawar",
        userReviews: [
          { username: "Farhan", review: "Delicious food and great atmosphere.", rating: 5 },
          { username: "Sana", review: "Food was good, but the service was slow.", rating: 4 }
        ]
      },
      { 
        name: "Chai Wala", 
        description: "A cozy tea shop serving traditional Pakistani chai and snacks.", 
        rating: 4.4, 
        reviews: 90, 
        image: "chaiwala_peshawar.jpg", 
        location: "Arbab Road, Peshawar",
        userReviews: [
          { username: "Omer", review: "Great place for tea and snacks.", rating: 5 },
          { username: "Aman", review: "Nice ambiance but could use more variety in snacks.", rating: 4 }
        ]
      }
    ],
    hotels: [
      { 
        name: "Pearl Continental Peshawar", 
        description: "A luxury hotel with modern facilities and a peaceful environment.", 
        rating: 4.6, 
        reviews: 160, 
        image: "pearl_continental_peshawar.jpg", 
        location: "Khyber Road, Peshawar",
        userReviews: [
          { username: "Raza", review: "The hotel is perfect for both business and leisure.", rating: 5 },
          { username: "Laila", review: "Comfortable stay, but the food could be improved.", rating: 4 }
        ]
      },
      { 
        name: "Safi Royal Hotel", 
        description: "A 5-star hotel with world-class amenities, offering a luxurious stay.", 
        rating: 4.8, 
        reviews: 170, 
        image: "safi_royal_hotel.jpg", 
        location: "University Road, Peshawar",
        userReviews: [
          { username: "Wasiq", review: "Luxury and comfort at its best!", rating: 5 },
          { username: "Nida", review: "Great facilities but a bit expensive.", rating: 4 }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Quetta",
    rating: 4.5,
    reviews: 110,
    image: "Quetta.jpg",
    historicalPlaces: [
      {
        name: "Quetta Fort",
        description: "Quetta Fort is a historic military fort built during the colonial era, offering an insight into the region's history.",
        rating: 4.7,
        reviews: 120,
        image: "quetta_fort.jpg",
        location: "Zarghoon Road, Quetta",
        userReviews: [
          { username: "Nashit", review: "A beautiful historical site with great views.", rating: 5 },
          { username: "Arshad", review: "The fort is nice, but needs better maintenance.", rating: 4 }
        ]
      },
      {
        name: "Hanna Lake",
        description: "A beautiful lake surrounded by mountains, ideal for a peaceful retreat and a great picnic spot.",
        rating: 4.6,
        reviews: 100,
        image: "hanna_lake.jpg",
        location: "Hanna Lake Road, Quetta",
        userReviews: [
          { username: "Ali", review: "One of the most peaceful places in Quetta!", rating: 5 },
          { username: "Zain", review: "The view is fantastic, but the road to get there could be improved.", rating: 4 }
        ]
      }
    ],
    restaurants: [
      {
        name: "Balochi Sajji House",
        description: "A famous restaurant offering traditional Balochi dishes, especially Sajji, a stuffed lamb.",
        rating: 4.8,
        reviews: 150,
        image: "balochi_sajji.jpg",
        location: "Jinnah Road, Quetta",
        userReviews: [
          { username: "Fahad", review: "Best Sajji in town! Highly recommended.", rating: 5 },
          { username: "Shazia", review: "The food is great but can be too spicy for some.", rating: 4 }
        ]
      },
      {
        name: "Quetta Green Restaurant",
        description: "A family-friendly restaurant offering a variety of continental and traditional dishes.",
        rating: 4.7,
        reviews: 120,
        image: "quetta_green.jpg",
        location: "Shahbaz Town, Quetta",
        userReviews: [
          { username: "Farhan", review: "Great ambiance and delicious food.", rating: 5 },
          { username: "Saima", review: "The food was good but the service was slow.", rating: 4 }
        ]
      }
    ],
    hotels: [
      {
        name: "Serena Hotel Quetta",
        description: "A luxury hotel offering modern amenities, perfect for both business and leisure travelers.",
        rating: 4.9,
        reviews: 160,
        image: "serena_quetta.jpg",
        location: "Zarghoon Road, Quetta",
        userReviews: [
          { username: "Tariq", review: "Fantastic stay, highly professional staff.", rating: 5 },
          { username: "Sana", review: "Nice hotel, though the food could use some improvement.", rating: 4 }
        ]
      },
      {
        name: "Pearl Continental Quetta",
        description: "A luxury hotel with premium rooms and first-class services.",
        rating: 4.8,
        reviews: 180,
        image: "pearl_continental_quetta.jpg",
        location: "Zarghoon Road, Quetta",
        userReviews: [
          { username: "Muneeb", review: "Superb services and great rooms!", rating: 5 },
          { username: "Nida", review: "Comfortable stay but a bit on the expensive side.", rating: 4 }
        ]
      }
    ]
  },

  // Faisalabad
  {
    id: 6,
    title: "Faisalabad",
    rating: 4.4,
    reviews: 95,
    image: "Faisalabad.jpg",
    historicalPlaces: [
      {
        name: "Faisalabad Clock Tower",
        description: "A historical clock tower, the heart of Faisalabad, surrounded by eight bazaars.",
        rating: 4.6,
        reviews: 110,
        image: "clock_tower.jpg",
        location: "Clock Tower, Faisalabad",
        userReviews: [
          { username: "Sami", review: "A historical gem in the city, very peaceful.", rating: 5 },
          { username: "Fariha", review: "Lovely place, but can get crowded in the evenings.", rating: 4 }
        ]
      },
      {
        name: "Ghulam Muhammadabad",
        description: "A local area with a rich history, offering a glimpse of Faisalabad's past.",
        rating: 4.5,
        reviews: 80,
        image: "ghulam_muhammadabad.jpg",
        location: "Ghulam Muhammadabad, Faisalabad",
        userReviews: [
          { username: "Ahsan", review: "The perfect place to learn about Faisalabad's history.", rating: 5 },
          { username: "Tariq", review: "Not much to see, but still a historical area worth visiting.", rating: 4 }
        ]
      }
    ],
    restaurants: [
      {
        name: "Sheesh Mahal Restaurant",
        description: "A traditional restaurant serving a wide range of Pakistani dishes with a royal touch.",
        rating: 4.7,
        reviews: 130,
        image: "sheesh_mahal.jpg",
        location: "Jaranwala Road, Faisalabad",
        userReviews: [
          { username: "Sara", review: "Great place for traditional food.", rating: 5 },
          { username: "Kashif", review: "Lovely ambiance, but the food can be a bit greasy.", rating: 4 }
        ]
      },
      {
        name: "Café Zainab",
        description: "A cozy cafe offering a mix of continental and local dishes.",
        rating: 4.6,
        reviews: 110,
        image: "cafe_zainab.jpg",
        location: "People’s Colony, Faisalabad",
        userReviews: [
          { username: "Hassan", review: "Great food and coffee!", rating: 5 },
          { username: "Laila", review: "Nice place, but a bit slow on service.", rating: 4 }
        ]
      }
    ],
    hotels: [
      {
        name: "Faisalabad Serena Hotel",
        description: "A luxury hotel with modern amenities and excellent services.",
        rating: 4.8,
        reviews: 140,
        image: "serena_faisalabad.jpg",
        location: "Club Road, Faisalabad",
        userReviews: [
          { username: "Omar", review: "Great hotel with very friendly staff.", rating: 5 },
          { username: "Sadia", review: "Good stay, but the room decor could be improved.", rating: 4 }
        ]
      },
      {
        name: "Pearl Continental Faisalabad",
        description: "A well-established luxury hotel known for its quality services and amenities.",
        rating: 4.7,
        reviews: 160,
        image: "pearl_continental_faisalabad.jpg",
        location: "Canal Road, Faisalabad",
        userReviews: [
          { username: "Zaid", review: "A great stay, definitely one of the best in Faisalabad.", rating: 5 },
          { username: "Maya", review: "Luxurious and comfortable, though a little pricey.", rating: 4 }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Hyderabad",
    rating: 4.3,
    reviews: 85,
    image: "Hyderabad.jpg",
    historicalPlaces: [
      {
        name: "Sindh Museum",
        description: "A museum showcasing the rich cultural heritage of Sindh, featuring ancient artifacts and exhibitions.",
        rating: 4.5,
        reviews: 90,
        image: "sindh_museum.jpg",
        location: "Sindh Museum, Hyderabad",
        userReviews: [
          { username: "Khalid", review: "A must-see for history enthusiasts!", rating: 5 },
          { username: "Sonia", review: "Great museum but needs better signage for the exhibits.", rating: 4 }
        ]
      },
      {
        name: "Qutb Shah's Tomb",
        description: "A historical tomb from the 17th century, surrounded by lush greenery and offering a glimpse into Hyderabad's past.",
        rating: 4.7,
        reviews: 80,
        image: "qutb_shah_tomb.jpg",
        location: "Qutb Shah's Tomb, Hyderabad",
        userReviews: [
          { username: "Ahsan", review: "Amazing historical site with a calm atmosphere.", rating: 5 },
          { username: "Nazia", review: "Beautiful tomb, but the area could use more upkeep.", rating: 4 }
        ]
      }
    ],
    restaurants: [
      {
        name: "The Grill House",
        description: "A popular restaurant offering a variety of grilled dishes with an amazing ambiance.",
        rating: 4.6,
        reviews: 100,
        image: "grill_house.jpg",
        location: "The Grill House, Hyderabad",
        userReviews: [
          { username: "Farhan", review: "Amazing grilled food, highly recommend.", rating: 5 },
          { username: "Mariya", review: "Good food but could improve on the sides.", rating: 4 }
        ]
      },
      {
        name: "Spice Garden",
        description: "A spice-themed restaurant offering traditional Hyderabad cuisine with a twist.",
        rating: 4.5,
        reviews: 85,
        image: "spice_garden.jpg",
        location: "Spice Garden, Hyderabad",
        userReviews: [
          { username: "Osman", review: "The food was excellent, especially the biryani.", rating: 5 },
          { username: "Laila", review: "A little too spicy for my taste, but still great food.", rating: 4 }
        ]
      }
    ],
    hotels: [
      {
        name: "Mughal Regency Hotel",
        description: "A mid-range hotel with well-furnished rooms and excellent service.",
        rating: 4.7,
        reviews: 120,
        image: "mughal_regency.jpg",
        location: "Mughal Regency Hotel, Hyderabad",
        userReviews: [
          { username: "Imran", review: "Great value for money, highly recommended.", rating: 5 },
          { username: "Ayesha", review: "Good service, but the rooms need a little updating.", rating: 4 }
        ]
      },
      {
        name: "Regency Hotel",
        description: "A well-maintained budget hotel with basic facilities and a central location.",
        rating: 4.3,
        reviews: 110,
        image: "regency_hotel.jpg",
        location: "Regency Hotel, Hyderabad",
        userReviews: [
          { username: "Shan", review: "Affordable and comfortable, perfect for short stays.", rating: 5 },
          { username: "Misha", review: "Decent hotel, but the rooms are quite small.", rating: 4 }
        ]
      }
    ]
  },

  // Multan
  {
    id: 8,
    title: "Multan",
    rating: 4.4,
    reviews: 95,
    image: "Multan.jpg",
    historicalPlaces: [
      {
        name: "Multan Fort",
        description: "An ancient fort with a rich history, known for its impressive architecture and views of the surrounding area.",
        rating: 4.6,
        reviews: 100,
        image: "multan_fort.jpg",
        location: "Multan Fort, Multan",
        userReviews: [
          { username: "Farhan", review: "A great historical landmark with a stunning view.", rating: 5 },
          { username: "Sami", review: "The fort is fascinating but could be better maintained.", rating: 4 }
        ]
      },
      {
        name: "Shrine of Bahauddin Zakariya",
        description: "A beautiful Sufi shrine, one of the most significant in the region, known for its religious and cultural importance.",
        rating: 4.8,
        reviews: 120,
        image: "shrine_bahauddin_zakariya.jpg",
        location: "Shrine of Bahauddin Zakariya, Multan",
        userReviews: [
          { username: "Sadia", review: "The shrine is a peaceful place, full of history and beauty.", rating: 5 },
          { username: "Ahmad", review: "A calming and spiritual visit, definitely recommended.", rating: 5 }
        ]
      }
    ],
    restaurants: [
      {
        name: "Bismillah Hotel",
        description: "A popular local restaurant serving delicious Pakistani dishes.",
        rating: 4.5,
        reviews: 110,
        image: "bismillah_hotel.jpg",
        location: "Bismillah Hotel, Multan",
        userReviews: [
          { username: "Zahid", review: "Great food and excellent service.", rating: 5 },
          { username: "Zara", review: "The food is amazing but the ambiance could be better.", rating: 4 }
        ]
      },
      {
        name: "The Mughal Restaurant",
        description: "A fine dining restaurant offering Mughlai cuisine with a royal touch.",
        rating: 4.6,
        reviews: 95,
        image: "mughal_restaurant.jpg",
        location: "The Mughal Restaurant, Multan",
        userReviews: [
          { username: "Hassan", review: "Excellent food and royal ambiance.", rating: 5 },
          { username: "Maira", review: "The food is good but it's quite expensive.", rating: 4 }
        ]
      }
    ],
    hotels: [
      {
        name: "Ravi Hotel",
        description: "A budget-friendly hotel offering basic amenities and a central location.",
        rating: 4.3,
        reviews: 100,
        image: "ravi_hotel.jpg",
        location: "Ravi Hotel, Multan",
        userReviews: [
          { username: "Asim", review: "Good value for money, basic services.", rating: 4 },
          { username: "Saman", review: "Comfortable stay but the rooms need better maintenance.", rating: 3 }
        ]
      },
      {
        name: "Pearl Continental Multan",
        description: "A luxury hotel with premium facilities, perfect for business and leisure travelers.",
        rating: 4.8,
        reviews: 130,
        image: "pearl_continental_multan.jpg",
        location: "Pearl Continental Multan, Multan",
        userReviews: [
          { username: "Ahmed", review: "A fantastic hotel with top-notch services.", rating: 5 },
          { username: "Aisha", review: "A bit on the pricier side, but totally worth it.", rating: 5 }
        ]
      }
    ]
  },

  // Sukkur
  {
    id: 9,
    title: "Sukkur",
    rating: 4.2,
    reviews: 80,
    image: "Sukkur.jpg",
    historicalPlaces: [
      {
        name: "Sukkur Barrage",
        description: "A historical engineering marvel, the Sukkur Barrage provides irrigation to the region and offers scenic views of the river.",
        rating: 4.6,
        reviews: 90,
        image: "sukkur_barrage.jpg",
        location: "Sukkur Barrage, Sukkur",
        userReviews: [
          { username: "Fahad", review: "Great place to visit for those interested in engineering history.", rating: 5 },
          { username: "Nazia", review: "Nice place for a walk, though it's a bit too crowded.", rating: 4 }
        ]
      },
      {
        name: "The Shrine of Lal Shahbaz Qalandar",
        description: "A famous Sufi shrine located in Sehwan Sharif, attracting thousands of devotees every year.",
        rating: 4.8,
        reviews: 110,
        image: "lal_shahbaz_qalandar_shrine.jpg",
        location: "Sehwan Sharif, Sukkur",
        userReviews: [
          { username: "Raza", review: "A serene place with a lot of spiritual significance.", rating: 5 },
          { username: "Sara", review: "A peaceful visit with much to reflect on.", rating: 5 }
        ]
      }
    ],
    restaurants: [
      {
        name: "Mirza Restaurant",
        description: "Serving traditional Pakistani and local Sindhi cuisine.",
        rating: 4.5,
        reviews: 95,
        image: "mirza_restaurant.jpg",
        location: "Mirza Restaurant, Sukkur",
        userReviews: [
          { username: "Nashit", review: "Great Sindhi food, highly recommend the Sindhi Biryani!", rating: 5 },
          { username: "Kiran", review: "The food was good but the service was slow.", rating: 4 }
        ]
      },
      {
        name: "Sindh Tandoor",
        description: "A popular place offering traditional tandoori dishes, with a great selection of kebabs.",
        rating: 4.6,
        reviews: 85,
        image: "sindh_tandoor.jpg",
        location: "Sindh Tandoor, Sukkur",
        userReviews: [
          { username: "Salah", review: "Amazing kebabs, one of the best I've had in Pakistan!", rating: 5 },
          { username: "Sajida", review: "Good food, but the place could be cleaner.", rating: 4 }
        ]
      }
    ],
    hotels: [
      {
        name: "Indus Hotel",
        description: "A comfortable, budget-friendly hotel with clean rooms and friendly service.",
        rating: 4.3,
        reviews: 90,
        image: "indus_hotel.jpg",
        location: "Indus Hotel, Sukkur",
        userReviews: [
          { username: "Zain", review: "Good budget hotel for a short stay.", rating: 4 },
          { username: "Mira", review: "Not luxurious, but clean and convenient.", rating: 3 }
        ]
      },
      {
        name: "Sukkur Marriott Hotel",
        description: "A luxury hotel with a great range of services and a perfect location near the river.",
        rating: 4.7,
        reviews: 130,
        image: "marriott_sukkur.jpg",
        location: "Sukkur Marriott Hotel, Sukkur",
        userReviews: [
          { username: "Hassan", review: "Great service, beautiful hotel with a stunning view.", rating: 5 },
          { username: "Sania", review: "Nice hotel, a little expensive for the area.", rating: 4 }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Mansehra",
    rating: 4.3,
    reviews: 90,
    image: "Mansehra.jpg",
    historicalPlaces: [
      {
        name: "Shogran Valley",
        description: "A stunning hill station with breathtaking views of the surrounding mountains and lush greenery.",
        rating: 4.8,
        reviews: 100,
        image: "shogran_valley.jpg",
        location: "Shogran Valley, Mansehra",
        userReviews: [
          { username: "Rashid", review: "A magical place to relax and unwind in nature.", rating: 5 },
          { username: "Laila", review: "A little too crowded during peak season, but still beautiful.", rating: 4 }
        ]
      },
      {
        name: "Batakundi",
        description: "A peaceful village known for its picturesque landscapes and tranquility, perfect for a weekend getaway.",
        rating: 4.7,
        reviews: 95,
        image: "batakundi.jpg",
        location: "Batakundi, Mansehra",
        userReviews: [
          { username: "Zubair", review: "A calm and peaceful place with stunning views.", rating: 5 },
          { username: "Sara", review: "A quiet retreat, perfect for nature lovers.", rating: 5 }
        ]
      }
    ],
    restaurants: [
      {
        name: "Mansehra Restaurant",
        description: "A local eatery known for its traditional Pakistani food and friendly service.",
        rating: 4.5,
        reviews: 100,
        image: "mansehra_restaurant.jpg",
        location: "Mansehra Restaurant, Mansehra",
        userReviews: [
          { username: "Khalil", review: "Delicious food with a homely atmosphere.", rating: 5 },
          { username: "Yasmeen", review: "Food is good, but the service could be faster.", rating: 4 }
        ]
      },
      {
        name: "Mountain View Restaurant",
        description: "A scenic restaurant offering great food with a view of the mountains.",
        rating: 4.6,
        reviews: 110,
        image: "mountain_view.jpg",
        location: "Mountain View Restaurant, Mansehra",
        userReviews: [
          { username: "Ali", review: "The food is good, and the view is spectacular.", rating: 5 },
          { username: "Reema", review: "Great food, but the service needs improvement.", rating: 4 }
        ]
      }
    ],
    hotels: [
      {
        name: "Kaghan View Hotel",
        description: "A comfortable hotel offering stunning views of the surrounding mountains and valley.",
        rating: 4.4,
        reviews: 95,
        image: "kaghan_view_hotel.jpg",
        location: "Kaghan View Hotel, Mansehra",
        userReviews: [
          { username: "Sadiq", review: "The location is amazing, with beautiful views all around.", rating: 5 },
          { username: "Noreen", review: "Comfortable stay, but the hotel needs some renovations.", rating: 4 }
        ]
      },
      {
        name: "Shangrila Resort",
        description: "A luxurious resort offering premium services, perfect for a relaxing getaway.",
        rating: 4.7,
        reviews: 120,
        image: "shangrila_resort.jpg",
        location: "Shangrila Resort, Mansehra",
        userReviews: [
          { username: "Hamza", review: "A fantastic resort, perfect for a peaceful retreat.", rating: 5 },
          { username: "Anum", review: "Amazing resort with great facilities, but it’s a bit expensive.", rating: 4 }
        ]
      }
    ]
  }
  

];

// Route to get all tours
app.get('/api/tours', (req, res) => {
  res.json(tours);
});

// Route to get a specific tour by ID
app.get('/api/tours/:id', (req, res) => {
  const { id } = req.params;
  const tour = tours.find(t => t.id === parseInt(id));

  if (!tour) {
    return res.status(404).json({ message: 'Tour not found' });
  }
  res.json(tour);
});

// Route to get details of a specific historical place
app.get('/api/tours/:id/historical-places/:place', (req, res) => {
  const { id, place } = req.params;
  const decodedPlace = decodeURIComponent(place); // Decode to match with the name correctly

  // Find the tour by id
  const tour = tours.find(t => t.id === parseInt(id));
  if (!tour) {
    return res.status(404).json({ error: 'Tour not found' });
  }

  // Find the historical place by name
  const historicalPlace = tour.historicalPlaces.find(p => p.name === decodedPlace);
  if (!historicalPlace) {
    return res.status(404).json({ error: 'Historical place not found' });
  }

  // Ensure all necessary fields are included
  const response = {
    name: historicalPlace.name,
    description: historicalPlace.description || "No description available",  // Default description
    image: historicalPlace.image, // Fallback image if not available
    address: historicalPlace.location || 'No address available',  // Use the address string directly
    reviews: historicalPlace.reviews || 0,  // Default reviews count if not available
    rating: historicalPlace.rating || 4.8,  // Historical place specific rating
    userReviews: historicalPlace.userReviews || [],  // User reviews array
  };
  

  // Send the response
  res.json(response);
});

// Route to get details of a specific restaurant
app.get('/api/tours/:id/restaurants/:restaurant', (req, res) => {
  const { id, restaurant } = req.params;
  const decodedRestaurant = decodeURIComponent(restaurant); // Decode to match with the name correctly

  // Find the tour by id
  const tour = tours.find(t => t.id === parseInt(id));
  if (!tour) {
    return res.status(404).json({ error: 'Tour not found' });
  }

  // Find the restaurant by name
  const restaurantDetail = tour.restaurants.find(r => r.name === decodedRestaurant);
  if (!restaurantDetail) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }

  // Ensure all necessary fields are included
  const response = {
    name: restaurantDetail.name,
    description: restaurantDetail.description || "No description available",  // Default description
    image: restaurantDetail.image, // Fallback image if not available
    address: restaurantDetail.location || 'No address available',  // Use the address string directly
    reviews: restaurantDetail.reviews || 0,  // Default reviews count if not available
    rating: restaurantDetail.rating || 4.8,  // Restaurant specific rating
    userReviews: restaurantDetail.userReviews || [],  // User reviews array
  };

  // Send the response
  res.json(response);
});


// Route to get details of a specific hotel
app.get('/api/tours/:id/hotels/:hotel', (req, res) => {
  const { id, hotel } = req.params;
  const decodedHotel = decodeURIComponent(hotel); // Decode to match with the name correctly

  // Find the tour by id
  const tour = tours.find(t => t.id === parseInt(id));
  if (!tour) {
    return res.status(404).json({ error: 'Tour not found' });
  }

  // Find the hotel by name
  const hotelDetail = tour.hotels.find(h => h.name === decodedHotel);
  if (!hotelDetail) {
    return res.status(404).json({ error: 'Hotel not found' });
  }

  // Ensure all necessary fields are included
  const response = {
    name: hotelDetail.name,
    description: hotelDetail.description || "No description available",  // Default description
    image: hotelDetail.image, // Fallback image if not available
    address: hotelDetail.location || 'No address available',  // Use the address string directly
    reviews: hotelDetail.reviews || 0,  // Default reviews count if not available
    rating: hotelDetail.rating || 4.8,  // Hotel specific rating
    userReviews: hotelDetail.userReviews || [],  // User reviews array
  };

  // Send the response
  res.json(response);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
