import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography, Tabs, Tab, Box, Container, Grid, Paper } from "@mui/material";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { CheckCircle, Star, Award, Users } from "lucide-react";
import SectionTitle from "./SectionTitle";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: "wintan1418",
  },
});

const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const aboutContent = [
    {
      title: "Our Story",
      content:
        "At GrandStyle Events, we transform your dreams into reality with seamless event planning and execution. From luxury weddings to corporate gatherings and milestone celebrations, we ensure every detail is handled with expertise, creativity, and precision.",
      publicId: "about/nbwgtwfgjvbalbvvdohy",
      color: "#900000",
      icon: <Award size={32} />,
      accentPoints: [
        "Established 2012",
        "Industry Leaders",
        "Award-winning Team",
      ],
    },
    {
      title: "Why Choose Us",
      content:
        "We create tailored experiences that truly reflect your style with flawless execution. Our dedicated team ensures every detail is perfect, providing stress-free planning from start to finish. With over a decade of experience, we've built a reputation for excellence that our clients trust.",
      publicId: "about/why_choose_us",
      color: "#00008B",
      icon: <Star size={32} />,
      accentPoints: [
        "Client-focused",
        "Innovative Solutions",
        "Exceptional Execution",
      ],
    },
    {
      title: "Our Process",
      content:
        "We follow a proven four-step process: Discovery, where we understand your vision; Design, where we create a tailored plan; Coordination, where we manage all logistics and vendors; and finally, Execution, where we bring your event to life exactly as envisioned.",
      publicId: "services/yfmibnaoapymegbn5pbo",
      color: "#40E0D0",
      icon: <Users size={32} />,
      accentPoints: ["Discover", "Design", "Coordinate", "Execute"],
    },
  ];

  // Stats data
  const stats = [
    { value: "500+", label: "Events Completed" },
    { value: "12+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Team Members" },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <SectionTitle
          subtitle="Get to Know Us"
          title="About GrandStyle Events"
          description="Crafting unforgettable moments and bringing your dreams to life with passion, precision, and African elegance"
        />

        {/* Tabbed Navigation */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 6,
            bgcolor: "transparent",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="about section tabs"
            sx={{
              bgcolor: "white",
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              "& .MuiTab-root": {
                py: 2,
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 600,
                textTransform: "none",
                color: "text.secondary",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "primary.main",
                },
              },
              "& .Mui-selected": {
                color: aboutContent[activeTab].color,
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
                backgroundColor: aboutContent[activeTab].color,
              },
            }}
          >
            {aboutContent.map((item, index) => (
              <Tab
                key={index}
                label={item.title}
                icon={item.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Paper>

        {/* Content Area */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          key={activeTab}
        >
          <Grid container spacing={6} alignItems="center">
            {/* Image */}
            <Grid item xs={12} md={6}>
              <motion.div variants={childVariant}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -20,
                      left: -20,
                      width: 150,
                      height: 150,
                      bgcolor: aboutContent[activeTab].color,
                      borderRadius: "50%",
                      opacity: 0.1,
                      zIndex: -1,
                    },
                  }}
                >
                  <AdvancedImage
                    cldImg={cld
                      .image(aboutContent[activeTab].publicId)
                      .resize(fill().width(800).height(600).gravity(autoGravity()))
                      .quality("auto:best")
                      .format("auto")}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    alt={aboutContent[activeTab].title}
                  />
                </Box>
              </motion.div>
            </Grid>

            {/* Text Content */}
            <Grid item xs={12} md={6}>
              <motion.div variants={childVariant}>
                <Typography
                  component="h3"
                  variant="h3"
                  sx={{
                    color: aboutContent[activeTab].color,
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  {aboutContent[activeTab].title}
                </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      mb: 4,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      lineHeight: 1.8,
                    }}
                  >
                    {aboutContent[activeTab].content} Our commitment to excellence has earned us recognition as one of Nigeria's leading event planning companies. We understand that every event is unique, and we take pride in creating personalized experiences that reflect your vision and values. From initial consultation to final execution, our team works closely with you to ensure every detail is perfect. We maintain strong relationships with trusted vendors and suppliers, allowing us to deliver exceptional quality at competitive prices. Our comprehensive approach covers all aspects of event planning, including logistics coordination, timeline management, budget planning, and on-site supervision. With offices in Ondo, Lagos, and Abuja, we're well-positioned to serve clients across Nigeria and internationally. Explore our <a href="#services" style={{ color: aboutContent[activeTab].color, textDecoration: 'underline', fontWeight: 600 }}>comprehensive event planning services</a> or <a href="#contact" style={{ color: aboutContent[activeTab].color, textDecoration: 'underline', fontWeight: 600 }}>contact us</a> to discuss your event needs.
                  </Typography>

                {/* Accent Points */}
                <Box sx={{ mb: 4 }}>
                  {aboutContent[activeTab].accentPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      variants={childVariant}
                      custom={idx}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <CheckCircle
                          size={24}
                          style={{
                            color: aboutContent[activeTab].color,
                            marginRight: 12,
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            color: "text.primary",
                          }}
                        >
                          {point}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              mt: 8,
              p: { xs: 3, md: 5 },
              bgcolor: "white",
              borderRadius: 4,
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            }}
          >
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    component="div"
                    variant="h3"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;