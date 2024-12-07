import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "black",
        color: "white",
        pt: 6,
        pb: 4,
        borderTop: "1px solid #444",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand Information */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="secondary"
            >
              Grandstyle Events
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Creating unforgettable experiences since 2012. Specializing in
              weddings, corporate events, and milestone celebrations.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="secondary"
            >
              Quick Links
            </Typography>
            {[
              { href: "#about", label: "About Us" },
              { href: "#services", label: "Our Services" },
              { href: "#gallery", label: "Event Gallery" },
              { href: "#testimonials", label: "Testimonials" },
              { href: "#contact", label: "Contact Us" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                color="inherit"
                display="block"
                sx={{
                  mb: 1,
                  transition: "color 0.3s",
                  "&:hover": { color: "secondary.main" },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="secondary"
            >
              Connect With Us
            </Typography>
            <Box>
              {[
                {
                  href: "https://www.facebook.com/grandstyleevents",
                  icon: <FacebookIcon />,
                  label: "Facebook",
                },
                {
                  href: "https://www.twitter.com/grandstyleevents",
                  icon: <TwitterIcon />,
                  label: "Twitter",
                },
                {
                  href: "https://www.instagram.com/grandstyleevents",
                  icon: <InstagramIcon />,
                  label: "Instagram",
                },
                {
                  href: "https://www.linkedin.com/company/grandstyleevents/",
                  icon: <LinkedInIcon />,
                  label: "LinkedIn",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  color="inherit"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mr: 1 }}
                >
                  <IconButton
                    aria-label={social.label}
                    sx={{
                      color: "white",
                      transition: "transform 0.3s",
                      "&:hover": {
                        color: "secondary.main",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Footer Credits */}
        <Box mt={5} textAlign="center">
          <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
            &copy; {new Date().getFullYear()} Grandstyle Events. All rights
            reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              color: "secondary.main",
              fontSize: "0.9rem",
            }}
          >
            Developed by Wintech
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
