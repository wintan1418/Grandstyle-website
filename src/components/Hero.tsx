import React from "react";
import { Typography, Button, Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image: "src/assets/landingpage/hall 1.jpg",
    title: "Vibrant African Weddings",
    subtitle: "Celebrate love with the colors and traditions of Africa",
  },
  {
    image: "src/assets/landingpage/hall 2.jpg",
    title: "Owambe Extravaganza",
    subtitle: "Experience the joy and energy of true Nigerian celebrations",
  },
  {
    image: "src/assets/landingpage/hall 3.jpg",
    title: "Corporate Events with African Flair",
    subtitle:
      "Impress your clients with our unique blend of professionalism and culture",
  },
  {
    image: "src/assets/landingpage/hall 4.jpg",
    title: "Memorable Birthday Bashes",
    subtitle:
      "Turn your special day into an unforgettable African-inspired celebration",
  },
];

const Hero: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Reduced from 5000 to 4000
  };

  return (
    <Box className="relative h-screen">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative h-screen">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-screen object-cover"
              />
              <Box className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center px-4">
                  <Typography
                    variant="h2"
                    className="mb-6 font-bold text-5xl md:text-6xl"
                    style={{ color: "#00CED1" }} // Inline style for dark turquoise
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    className="mb-12 text-xl md:text-2xl"
                    style={{ color: "white" }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="text-lg py-3 px-8 bg-yellow-500 hover:bg-yellow-600"
                  >
                    Plan Your Event
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Hero;
