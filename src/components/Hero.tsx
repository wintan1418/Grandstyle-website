import React, { useState } from "react";
import { Typography, Button, Box, Container, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion } from "framer-motion";

// Cloudinary setup
const cld = new Cloudinary({
  cloud: {
    cloudName: "wintan1418",
  },
});

const slides = [
  {
    publicId: "gallery/Memorable_Birthday_Bashes_nc02bb",
    title: "Memorable Birthday Bashes",
    subtitle: "Turn your special day into an unforgettable African-inspired celebration",
    highlight: "Birthday Celebrations",
  },
  {
    publicId: "gallery/Corporate_Events_with_African_Flair_hvhrmz",
    title: "Vibrant African Weddings",
    subtitle: "Celebrate love with the colors and traditions of Africa",
    highlight: "Wedding Planning",
  },
  {
    publicId: "gallery/Vibrant_African_Weddings_qlff08",
    title: "Owambe Extravaganza",
    subtitle: "Experience the joy and energy of true Nigerian celebrations",
    highlight: "Cultural Events",
  },
  {
    publicId: "gallery/burial_seremony_agw5rw",
    title: "Corporate Events with African Flair",
    subtitle: "Impress your clients with our unique blend of professionalism and culture",
    highlight: "Corporate Events",
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    fade: true,
    cssEase: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
    beforeChange: (_current: number, next: number) => setActiveSlide(next),
    appendDots: (dots: React.ReactNode) => (
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 70, md: 90 },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 10,
        }}
      >
        {dots}
      </Box>
    ),
    customPaging: (i: number) => (
      <Box
        sx={{
          width: i === activeSlide ? 40 : 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: i === activeSlide ? "white" : "rgba(255,255,255,0.5)",
          transition: "all 0.5s ease",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      />
    ),
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="hero"
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Background Slider - Full Screen */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          "& .slick-slider, & .slick-list, & .slick-track": {
            height: "100%",
          },
          "& .slick-slide > div": {
            height: "100%",
          },
        }}
      >
        <Slider {...settings}>
          {slides.map((slide, index) => {
            const cloudinaryImage = cld
              .image(slide.publicId)
              .resize(fill().width(1920).height(1080).gravity(autoGravity()))
              .quality("auto:best")
              .format("auto");

            return (
              <Box key={index} sx={{ position: "relative", height: "100vh" }}>
                <AdvancedImage
                  cldImg={cloudinaryImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt={slide.title}
                />
                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)",
                  }}
                />
              </Box>
            );
          })}
        </Slider>
      </Box>

      {/* Content Section - Flexible Height */}
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pt: { xs: 7, md: 8 }, // Safe area from header
          pb: { xs: 10, md: 12 }, // Safe area for scroll indicator
        }}
      >
        <Container maxWidth="xl" sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Grid container spacing={4} alignItems="center" sx={{ width: "100%" }}>
            {/* Left Column - Text Content */}
            <Grid item xs={12} md={7}>
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                  {/* Category Tag */}
                  <Box
                    sx={{
                      display: "inline-block",
                      px: { xs: 2.5, sm: 3 },
                      py: { xs: 1, sm: 1.5 },
                      mb: { xs: 2, sm: 3, md: 4 },
                      backgroundColor: "rgba(64, 224, 208, 0.25)",
                      border: "1px solid rgba(64, 224, 208, 0.6)",
                      borderRadius: "50px",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#40E0D0",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      {slides[activeSlide].highlight}
                    </Typography>
                  </Box>

                  {/* Main Title */}
                  <Typography
                    component="h1"
                    variant="h1"
                    sx={{
                      color: "white",
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: { xs: "2rem", sm: "2.75rem", md: "4rem", lg: "5rem", xl: "5.5rem" },
                      lineHeight: { xs: 1.15, sm: 1.15, md: 1.1 },
                      mb: { xs: 2, sm: 3, md: 4 },
                      textShadow: "2px 4px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slides[activeSlide].title.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{ display: "inline-block", marginRight: "0.3em" }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    component="p"
                    variant="h5"
                    sx={{
                      color: "rgba(255,255,255,0.95)",
                      mb: { xs: 3, sm: 4, md: 6 },
                      fontWeight: 300,
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem", lg: "1.625rem" },
                      lineHeight: { xs: 1.4, sm: 1.5 },
                      maxWidth: { xs: "100%", sm: "500px", md: "600px" },
                      mx: { xs: "auto", sm: "auto", md: 0 },
                    }}
                  >
                    {slides[activeSlide].subtitle}
                  </Typography>

                  {/* CTA Buttons */}
                  <Box 
                    sx={{ 
                      display: "flex", 
                      flexDirection: { xs: "column", sm: "column", md: "row" },
                      gap: { xs: 2, sm: 2.5, md: 3 },
                      justifyContent: { xs: "center", sm: "center", md: "flex-start" },
                      alignItems: { xs: "center", sm: "center", md: "flex-start" },
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Button
                        component="a"
                        href="#contact"
                        variant="contained"
                        size="large"
                        startIcon={<CalendarTodayIcon />}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById("contact");
                          element?.scrollIntoView({ behavior: "smooth" });
                        }}
                        sx={{
                          px: { xs: 3, sm: 4, md: 5, lg: 6 },
                          py: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
                          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem" },
                          fontWeight: 600,
                          borderRadius: "50px",
                          background: "linear-gradient(135deg, #900000 0%, #DC143C 100%)",
                          boxShadow: "0 8px 32px rgba(220, 20, 60, 0.4)",
                          textTransform: "none",
                          transition: "all 0.3s ease",
                          minWidth: { xs: 200, sm: 220, md: "auto" },
                          textDecoration: "none",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 12px 48px rgba(220, 20, 60, 0.5)",
                          },
                        }}
                      >
                        Start Planning Today
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<PlayCircleOutlineIcon />}
                        sx={{
                          px: { xs: 3, sm: 4, md: 5, lg: 6 },
                          py: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
                          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem" },
                          fontWeight: 500,
                          borderRadius: "50px",
                          borderColor: "rgba(255,255,255,0.8)",
                          color: "white",
                          borderWidth: 2,
                          textTransform: "none",
                          backdropFilter: "blur(10px)",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          transition: "all 0.3s ease",
                          minWidth: { xs: 200, sm: 220, md: "auto" },
                          "&:hover": {
                            borderColor: "white",
                            backgroundColor: "rgba(255,255,255,0.2)",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        Watch Our Story
                      </Button>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Column - Stats */}
            <Grid item xs={12} sm={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Box
                  sx={{
                    display: { xs: "none", sm: "none", md: "flex" },
                    flexDirection: "column",
                    gap: 4,
                    pl: 4,
                  }}
                >
                  {[
                    { number: "500+", label: "Events Completed" },
                    { number: "12+", label: "Years Experience" },
                    { number: "98%", label: "Client Satisfaction" },
                  ].map((stat, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        p: 3,
                        borderLeft: "4px solid rgba(64, 224, 208, 0.6)",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "0 20px 20px 0",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.15)",
                          borderColor: "#40E0D0",
                          transform: "translateX(10px)",
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          color: "#40E0D0",
                          fontWeight: 700,
                          fontSize: "2.5rem",
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          fontSize: "1.125rem",
                          fontWeight: 400,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={scrollToNext}
      >
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: 2,
            mb: 1,
            display: { xs: "none", md: "block" },
          }}
        >
          Scroll to explore
        </Typography>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <KeyboardArrowDownIcon
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "2rem",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#40E0D0",
              },
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;