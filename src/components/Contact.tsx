import React from "react";
import {
  Typography,
  Box,
  Container,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { WhatsApp, Instagram, Facebook, Twitter } from "@mui/icons-material";
import SectionTitle from "./SectionTitle";

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: "Call Us",
      details: ["+234 806 509 8130"],
      link: "tel:+2348065098130",
      color: "#00008B",
    },
    {
      icon: <WhatsApp />,
      title: "WhatsApp",
      details: ["+234 813 763 5064"],
      link: "https://wa.me/2348137635064",
      color: "#25D366",
    },
    {
      icon: <EmailIcon />,
      title: "Email Us",
      details: ["info@grandstylevents.com"],
      link: "mailto:info@grandstylevents.com",
      color: "#900000",
    },
    {
      icon: <LocationOnIcon />,
      title: "Visit Us",
      details: ["Ondo, Lagos & Abuja", "Nigeria"],
      color: "#40E0D0",
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, url: "#", name: "Facebook" },
    { icon: <Instagram />, url: "#", name: "Instagram" },
    { icon: <Twitter />, url: "#", name: "Twitter" },
    { icon: <WhatsApp />, url: "https://wa.me/2348137635064", name: "WhatsApp" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(64,224,208,0.1) 0%, transparent 70%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(144,0,0,0.05) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="lg">
        <SectionTitle
          subtitle="Get in Touch"
          title="Let's Create Something Amazing Together"
          description="Ready to turn your vision into reality? We're here to help make your event unforgettable."
        />

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                component="h2"
                variant="h3"
                sx={{
                  fontWeight: 600,
                  mb: 4,
                  color: "primary.main",
                }}
              >
                Reach Out to Us
              </Typography>

              {contactInfo.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Paper
                    elevation={0}
                    component={item.link ? "a" : "div"}
                    href={item.link}
                    target={item.link?.startsWith("http") ? "_blank" : undefined}
                    rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                    sx={{
                      p: 3,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      cursor: item.link ? "pointer" : "default",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                        borderColor: item.color,
                        "& .icon-wrapper": {
                          transform: "rotate(360deg)",
                          backgroundColor: item.color,
                          color: "white",
                        },
                      },
                    }}
                  >
                    <Box
                      className="icon-wrapper"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        mr: 3,
                        transition: "all 0.5s ease",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 500,
                          mb: 0.5,
                        }}
                      >
                        {item.title}
                      </Typography>
                      {item.details.map((detail, idx) => (
                        <Typography
                          key={idx}
                          variant="body1"
                          sx={{
                            color: "text.primary",
                            fontWeight: 600,
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                      {item.title === "Call Us" && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            mt: 1,
                            fontSize: "0.875rem",
                          }}
                        >
                          Available Monday to Saturday, 9 AM - 6 PM WAT
                        </Typography>
                      )}
                      {item.title === "Email Us" && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            mt: 1,
                            fontSize: "0.875rem",
                          }}
                        >
                          We typically respond within 24 hours
                        </Typography>
                      )}
                      {item.title === "Visit Us" && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            mt: 1,
                            fontSize: "0.875rem",
                          }}
                        >
                          Schedule a consultation at any of our locations
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <Box sx={{ mt: 4 }}>
                  <Typography
                    component="h3"
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    Follow Us
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          backgroundColor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white",
                            transform: "translateY(-3px)",
                            boxShadow: "0 6px 20px rgba(0,0,139,0.3)",
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  background: "white",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: "linear-gradient(90deg, #00008B 0%, #900000 50%, #40E0D0 100%)",
                  },
                }}
              >
                <Typography
                  component="h2"
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "primary.main",
                  }}
                >
                  Request a Quote
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 3,
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                  }}
                >
                  Fill out the form below to receive a personalized quote for your event. Our team will review your requirements and get back to you with a detailed proposal tailored to your needs and budget. Whether you're planning a wedding, corporate event, birthday celebration, or any special occasion, we're here to help bring your vision to life.
                </Typography>
                
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 600, md: 500 },
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdPNzlnnms0PjyEA4lJMcZYw1qoBxdO3GYyAx1gxONY3-XEAw/viewform?embedded=true"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Contact Form"
                    style={{
                      border: "none",
                    }}
                  >
                    Loading…
                  </iframe>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            sx={{
              mt: 8,
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: "linear-gradient(135deg, #00008B 0%, #4169E1 100%)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Typography
              component="h2"
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.75rem", md: "2.5rem" },
              }}
            >
              Ready to Make Your Event Unforgettable?
            </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      mb: 4,
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    We operate worldwide and are ready to bring your vision to life. With over 12 years of experience in event planning and management, Grandstyle Events has successfully organized over 500 events across Nigeria and internationally. Our team specializes in creating memorable experiences for weddings, corporate events, birthday celebrations, and cultural ceremonies. Whether you're planning an intimate gathering or a grand celebration, we provide comprehensive event planning services including venue selection, catering coordination, decor design, entertainment booking, and full event management. Learn more about our <a href="#services" style={{ color: '#40E0D0', textDecoration: 'underline', fontWeight: 600 }}>event planning services</a> and <a href="#about" style={{ color: '#40E0D0', textDecoration: 'underline', fontWeight: 600 }}>company background</a>. Contact us today to discuss your event needs and let us help you create an unforgettable experience.
                  </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => window.open("https://wa.me/2348137635064", "_blank")}
              sx={{
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: "50px",
                backgroundColor: "white",
                color: "white",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#40E0D0",
                  color: "white",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 48px rgba(0,0,0,0.3)",
                },
              }}
              startIcon={<WhatsApp />}
            >
              Chat with Us Now
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;