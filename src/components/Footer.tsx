import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Link,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  WhatsApp,
  Email,
  Phone,
  LocationOn,
  ArrowUpward,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = [
    { title: "About Us", href: "#about" },
    { title: "Our Services", href: "#services" },
    { title: "Gallery", href: "#gallery" },
    { title: "Testimonials", href: "#testimonials" },
    { title: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      icon: <Facebook />,
      url: "https://www.facebook.com/grandstyle.event",
      color: "#1877F2",
      name: "Facebook",
    },
    {
      icon: <Instagram />,
      url: "https://www.instagram.com/grandstyle.events?utm_source=qr&igsh=YWVtd2UxMHJkN3Nk",
      color: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
      name: "Instagram",
    },
    {
      icon: <Twitter />,
      url: "https://www.twitter.com/grandstyleevents",
      color: "#1DA1F2",
      name: "Twitter",
    },
    {
      icon: <LinkedIn />,
      url: "https://www.linkedin.com/company/grandstyleevents/",
      color: "#0077B5",
      name: "LinkedIn",
    },
    {
      icon: <WhatsApp />,
      url: "https://wa.me/2348137635064",
      color: "#25D366",
      name: "WhatsApp",
    },
  ];

  const contactInfo = [
    {
      icon: <Phone />,
      title: "Call Us",
      content: "+234 806 509 8130",
      link: "tel:+2348065098130",
    },
    {
      icon: <Email />,
      title: "Email Us",
      content: "info@grandstylevents.com",
      link: "mailto:info@grandstylevents.com",
    },
    {
      icon: <LocationOn />,
      title: "Visit Us",
      content: "Ondo, Lagos & Abuja, Nigeria",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, #40E0D0 50%, transparent 100%)",
        },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Main Footer Content */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box
                      component="img"
                      src="https://res.cloudinary.com/wintan1418/image/upload/c_thumb,w_200,g_face/v1743877057/logo%20folder/grandstyle%20logo.png"
                      alt="Grandstyle Events"
                      sx={{
                        height: 50,
                        width: "auto",
                        mr: 2,
                        filter: "brightness(1.2)",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          fontWeight: 700,
                          color: "white",
                          lineHeight: 1,
                        }}
                      >
                        Grandstyle
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#40E0D0",
                          fontSize: "0.9rem",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        Events
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    Creating unforgettable experiences since 2012. We specialize in 
                    African-inspired celebrations, weddings, corporate events, and 
                    milestone celebrations with worldwide service.
                  </Typography>
                  
                  {/* Social Media Icons */}
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          background: typeof social.color === "string" && social.color.includes("gradient")
                            ? social.color
                            : social.color,
                          color: "white",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-3px) scale(1.1)",
                            boxShadow: `0 8px 25px ${typeof social.color === "string" && !social.color.includes("gradient") ? social.color + "40" : "rgba(64,224,208,0.3)"}`,
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "#40E0D0",
                    fontSize: "1.25rem",
                  }}
                >
                  Quick Links
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {footerLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        if (element) {
                          const offset = 70;
                          const elementPosition = (element as HTMLElement).offsetTop - offset;
                          window.scrollTo({
                            top: elementPosition,
                            behavior: "smooth",
                          });
                        }
                      }}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        textDecoration: "none",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        position: "relative",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#40E0D0",
                          transform: "translateX(8px)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: "-16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "8px",
                          height: "2px",
                          backgroundColor: "#40E0D0",
                          transition: "width 0.3s ease",
                          opacity: 0,
                        },
                        "&:hover::before": {
                          opacity: 1,
                          width: "12px",
                        },
                      }}
                    >
                      {link.title}
                    </Link>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "#40E0D0",
                    fontSize: "1.25rem",
                  }}
                >
                  Get In Touch
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {contactInfo.map((contact, index) => (
                    <Box
                      key={index}
                      component={contact.link ? "a" : "div"}
                      href={contact.link}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.3s ease",
                        ...(contact.link && {
                          "&:hover": {
                            color: "#40E0D0",
                            transform: "translateX(4px)",
                          },
                        }),
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: "rgba(64,224,208,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#40E0D0",
                        }}
                      >
                        {contact.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "0.875rem",
                          }}
                        >
                          {contact.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "white",
                            fontWeight: 500,
                          }}
                        >
                          {contact.content}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.1)",
            my: 4,
          }}
        />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            py: 3,
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.875rem",
            }}
          >
            © {new Date().getFullYear()} Grandstyle Events. All rights reserved.
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#40E0D0",
                fontSize: "0.875rem",
                fontStyle: "italic",
              }}
            >
              Crafted with ❤️ by Wintech
            </Typography>
            
            <Button
              onClick={scrollToTop}
              sx={{
                minWidth: "auto",
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "rgba(64,224,208,0.2)",
                color: "#40E0D0",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#40E0D0",
                  color: "white",
                  transform: "translateY(-3px)",
                },
              }}
            >
              <ArrowUpward />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;