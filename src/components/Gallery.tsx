import React from "react";
import { Typography, Box, Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    title: "Event Hall",
  },
  {
    img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67",
    title: "Nigerian Party",
  },
  {
    img: "https://images.unsplash.com/photo-1551972873-b7e8754e8e26",
    title: "Security",
  },
  {
    img: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717",
    title: "Waitress",
  },
  {
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    title: "Corporate Event",
  },
  {
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    title: "Wedding",
  },
  {
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    title: "Concert",
  },
  {
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
    title: "Gala Dinner",
  },
  {
    img: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868",
    title: "Cultural Festival",
  },
];

const Gallery: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box id="gallery" className="py-24 bg-white">
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          className="mb-12 text-center font-bold text-gray-800"
        >
          Event Gallery
        </Typography>
        <Typography variant="body1" className="mb-8 text-center text-gray-600">
          Explore our diverse portfolio of events, from vibrant Nigerian parties
          to elegant corporate gatherings. Each image tells a story of joy,
          celebration, and impeccable planning.
        </Typography>
        <Slider {...settings}>
          {itemData.map((item) => (
            <div key={item.img} className="px-2 mt-12">
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Gallery;
