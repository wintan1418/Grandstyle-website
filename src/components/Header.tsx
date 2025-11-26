import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Services", "Gallery", "Testimonials", "Contact"];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      const offset = 70; // Accurate header height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isScrolled
            ? "linear-gradient(135deg, rgba(248, 249, 250, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)"
            : "linear-gradient(135deg, rgba(0, 0, 139, 0.95) 0%, rgba(144, 0, 0, 0.85) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: isScrolled 
            ? "1px solid rgba(0, 0, 139, 0.1)" 
            : "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: isScrolled 
            ? "0 4px 20px rgba(0, 0, 139, 0.1)" 
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          height: { xs: 55, md: 60 },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              height: { xs: 55, md: 60 },
              px: 0,
              minHeight: "unset !important",
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: { xs: 1, sm: 1, md: 1 },
                maxWidth: { sm: "200px", md: "unset" },
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component="a"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    component="img"
                    src="https://res.cloudinary.com/wintan1418/image/upload/c_thumb,w_200,g_face/v1743877057/logo%20folder/grandstyle%20logo.png"
                    alt="Grandstyle Events"
                    sx={{
                      height: { xs: 28, sm: 32, md: 38 },
                      width: "auto",
                      mr: { xs: 1, sm: 1.5 },
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                        color: isScrolled ? "primary.main" : "white",
                        lineHeight: 1.1,
                        textShadow: isScrolled ? "none" : "1px 2px 4px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Grandstyle
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isScrolled ? "secondary.main" : "#40E0D0",
                        fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" },
                        letterSpacing: { xs: 0.5, sm: 1 },
                        textTransform: "uppercase",
                        textShadow: isScrolled ? "none" : "1px 1px 2px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease",
                        lineHeight: 1,
                      }}
                    >
                      Events
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>

            {/* Tablet Get Started Button */}
            <Box sx={{ display: { xs: "none", sm: "flex", md: "none" }, alignItems: "center", ml: "auto", mr: 2 }}>
              <Button
                component="a"
                href="#contact"
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                sx={{
                  px: 2.5,
                  py: 0.75,
                  borderRadius: "30px",
                  background: "linear-gradient(135deg, #900000 0%, #DC143C 100%)",
                  boxShadow: "0 4px 15px rgba(144, 0, 0, 0.3)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(144, 0, 0, 0.4)",
                    background: "linear-gradient(135deg, #660000 0%, #900000 100%)",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", sm: "none", md: "flex" }, alignItems: "center", gap: { md: 0.5, lg: 1 } }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    component="a"
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item);
                    }}
                    sx={{
                      color: isScrolled ? "text.primary" : "white",
                      fontWeight: 500,
                      fontSize: { md: "0.85rem", lg: "0.9rem" },
                      px: { md: 1.5, lg: 2 },
                      py: 0.75,
                      borderRadius: "30px",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      textShadow: isScrolled ? "none" : "1px 1px 2px rgba(0,0,0,0.3)",
                      textDecoration: "none",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 0,
                        height: 0,
                        borderRadius: "50%",
                        background: isScrolled 
                          ? "rgba(0, 0, 139, 0.1)" 
                          : "rgba(255, 255, 255, 0.2)",
                        transform: "translate(-50%, -50%)",
                        transition: "width 0.5s, height 0.5s",
                      },
                      "&:hover": {
                        color: isScrolled ? "primary.main" : "#40E0D0",
                        "&:before": {
                          width: "100px",
                          height: "100px",
                        },
                      },
                    }}
                  >
                    {item}
                  </Button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  component="a"
                  href="#contact"
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  sx={{
                    ml: { md: 1, lg: 2 },
                    px: { md: 2, lg: 3 },
                    py: { md: 0.75, lg: 0.9 },
                    borderRadius: "30px",
                    background: "linear-gradient(135deg, #900000 0%, #DC143C 100%)",
                    boxShadow: "0 4px 15px rgba(144, 0, 0, 0.3)",
                    fontSize: { md: "0.85rem", lg: "0.9rem" },
                    fontWeight: 600,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(144, 0, 0, 0.4)",
                      background: "linear-gradient(135deg, #660000 0%, #900000 100%)",
                    },
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "block", sm: "block", md: "none" },
                color: isScrolled ? "primary.main" : "white",
                ml: 1,
                transition: "all 0.3s ease",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add spacer to prevent content from going under header */}
      <Toolbar sx={{ height: { xs: 55, md: 60 }, minHeight: "unset !important" }} />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
            maxWidth: 320,
            background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Mobile Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "primary.main" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Navigation */}
          <List sx={{ p: 0 }}>
            <AnimatePresence>
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ListItem disablePadding sx={{ mb: 2 }}>
                    <Button
                      component="a"
                      href={`#${item.toLowerCase()}`}
                      fullWidth
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item);
                      }}
                      sx={{
                        justifyContent: "flex-start",
                        color: "text.primary",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        py: 2,
                        px: 3,
                        borderRadius: "15px",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 139, 0.05)",
                          color: "primary.main",
                          transform: "translateX(10px)",
                        },
                      }}
                    >
                      {item}
                    </Button>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ListItem disablePadding sx={{ mt: 4 }}>
                <Button
                  component="a"
                  href="#contact"
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  sx={{
                    py: 2,
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #900000 0%, #DC143C 100%)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(144, 0, 0, 0.3)",
                    textDecoration: "none",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(144, 0, 0, 0.4)",
                    },
                  }}
                >
                  Get Started
                </Button>
              </ListItem>
            </motion.div>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;