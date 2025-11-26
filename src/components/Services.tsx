import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Modal,
  IconButton,
  Chip,
} from "@mui/material";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import {
  CalendarToday,
  LocationOn,
  People,
  MusicNote,
  Security,
  Campaign,
  Palette,
  Restaurant,
  Close,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";
import SectionTitle from "./SectionTitle";

const cld = new Cloudinary({
  cloud: {
    cloudName: "wintan1418",
  },
});

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      title: "Event Conceptualization & Planning",
      description:
        "Transform your vision into reality with our expert planning services, creating events that perfectly reflect your style and needs.",
      longDescription:
        "Our comprehensive planning process begins with understanding your vision and objectives. We then craft a detailed roadmap covering every aspect of your event, from initial concept to final execution. Our team handles timeline development, budget management, vendor coordination, and all the small details that make your event exceptional.",
      publicId: "gallery/Vibrant_African_Weddings_qlff08",
      color: "#00008B",
      category: "Planning",
      icon: <CalendarToday />,
      features: [
        "Personalized Planning",
        "Budget Management",
        "Timeline Creation",
        "Vendor Coordination",
      ],
    },
    {
      title: "Venue Selection & Management",
      description:
        "Find the ideal venue that sets the tone for your event and let us handle the details to ensure a seamless experience.",
      longDescription:
        "The perfect venue is the foundation of a successful event. Our team researches and scouts locations that align with your vision, budget, and practical needs. We negotiate contracts, manage site visits, and coordinate all venue-related logistics to ensure the space works perfectly for your event requirements.",
      publicId: "gallery/Corporate_Events_with_African_Flair_hvhrmz",
      color: "#900000",
      category: "Planning",
      icon: <LocationOn />,
      features: [
        "Venue Scouting",
        "Contract Negotiation",
        "Layout Planning",
        "On-site Coordination",
      ],
    },
    {
      title: "Birthday Celebrations",
      description:
        "Celebrate life's special moments with our custom birthday party planning, tailored to create lasting memories and pure joy.",
      longDescription:
        "From intimate gatherings to lavish celebrations, we design birthday experiences that reflect the personality and preferences of the guest of honor. Our services include theme development, activity planning, surprise coordination, and creating those special moments that will be remembered for years to come.",
      publicId: "gallery/Memorable_Birthday_Bashes_nc02bb",
      color: "#40E0D0",
      category: "Events",
      icon: <People />,
      features: [
        "Themed Experiences",
        "Custom Activities",
        "Surprise Planning",
        "Milestone Celebrations",
      ],
    },
    {
      title: "Catering & Beverage Services",
      description:
        "Indulge your guests with exquisite cuisine and refreshing drinks, crafted to elevate any event with culinary delight.",
      longDescription:
        "Our culinary partnerships allow us to offer exceptional food and beverage experiences. We coordinate menu development, tasting sessions, dietary accommodation, and stylish presentation. Whether you're looking for formal dining, casual buffets, or innovative food stations, we ensure your guests enjoy a memorable culinary journey.",
      publicId: "services/Gala Dinners",
      color: "#900000",
      category: "Catering",
      icon: <Restaurant />,
      features: [
        "Menu Development",
        "Beverage Programming",
        "Dietary Accommodations",
        "Service Staff Coordination",
      ],
    },
    {
      title: "Decor & Design",
      description:
        "Make a bold statement with stunning decor that transforms any space, creating an unforgettable ambiance for your event.",
      longDescription:
        "Our design team creates immersive environments that bring your event vision to life. From concept development to installation, we handle every aspect of your event's visual identity. Services include theme development, floral arrangements, lighting design, furniture selection, and custom installations that create Instagram-worthy moments.",
      publicId: "gallery/grandstyle_image_wk4u64",
      color: "#00008B",
      category: "Design",
      icon: <Palette />,
      features: [
        "Theme Development",
        "Floral Design",
        "Lighting Installations",
        "Custom Fabrication",
      ],
    },
    {
      title: "Live Entertainment",
      description:
        "Elevate your celebration with captivating performances, from live bands to DJs, ensuring an unforgettable experience for all.",
      longDescription:
        "The right entertainment transforms a good event into an unforgettable experience. We source and coordinate with top talent including bands, DJs, solo artists, and specialty performers. Our team handles all technical requirements, scheduling, and day-of coordination to ensure flawless performances that engage your guests.",
      publicId: "services/live band",
      color: "#40E0D0",
      category: "Entertainment",
      icon: <MusicNote />,
      features: [
        "Talent Booking",
        "Performance Scheduling",
        "Technical Coordination",
        "Custom Programming",
      ],
    },
  ];

  const handleServiceClick = (index: number) => {
    setSelectedService(index);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionTitle
          subtitle="What We Do"
          title="Our Premium Services"
          description="From intimate gatherings to grand celebrations, we provide comprehensive event planning services that bring your vision to life with African elegance and modern sophistication."
        />

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      borderColor: service.color,
                      "& .service-image": {
                        transform: "scale(1.05)",
                      },
                      "& .service-overlay": {
                        opacity: 0.8,
                      },
                    },
                  }}
                  onClick={() => handleServiceClick(index)}
                >
                  {/* Image Section */}
                  <Box sx={{ position: "relative", height: 240, overflow: "hidden" }}>
                    <AdvancedImage
                      cldImg={cld
                        .image(service.publicId)
                        .resize(fill().width(600).height(400).gravity(autoGravity()))
                        .quality("auto:best")
                        .format("auto")}
                      alt={service.title}
                      className="service-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                    
                    {/* Overlay */}
                    <Box
                      className="service-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(135deg, ${service.color}40 0%, transparent 70%)`,
                        opacity: 0.6,
                        transition: "opacity 0.3s ease",
                      }}
                    />

                    {/* Category Chip */}
                    <Chip
                      label={service.category}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        backgroundColor: service.color,
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />

                    {/* Icon */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: service.color,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      {service.icon}
                    </Box>
                  </Box>

                  {/* Content Section */}
                  <Box sx={{ p: 3 }}>
                    <Typography
                      component="h3"
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "text.primary",
                        fontSize: "1.125rem",
                      }}
                    >
                      {service.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        mb: 3,
                        lineHeight: 1.6,
                      }}
                    >
                      {service.description} Our experienced team works closely with clients to understand their unique needs and preferences, ensuring that every aspect of the service is tailored to create the perfect experience. We leverage our extensive network of trusted vendors and suppliers to deliver exceptional quality and value. Whether you're planning a small intimate gathering or a large-scale corporate event, our comprehensive approach ensures seamless execution from concept to completion.
                    </Typography>

                    <Button
                      variant="text"
                      endIcon={<ArrowForward />}
                      sx={{
                        color: service.color,
                        fontWeight: 600,
                        p: 0,
                        "&:hover": {
                          backgroundColor: "transparent",
                          "& .MuiButton-endIcon": {
                            transform: "translateX(4px)",
                          },
                        },
                        "& .MuiButton-endIcon": {
                          transition: "transform 0.2s ease",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Box
            sx={{
              mt: 10,
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: "linear-gradient(135deg, #00008B 0%, #4169E1 100%)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
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
              Ready to Plan Your Dream Event?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                mb: 4,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Let's discuss your vision and create something extraordinary together. Learn more <a href="#about" style={{ color: '#40E0D0', textDecoration: 'underline', fontWeight: 600 }}>about our company</a> and our commitment to excellence, or <a href="#contact" style={{ color: '#40E0D0', textDecoration: 'underline', fontWeight: 600 }}>get in touch</a> with our team to start planning your event today.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="https://wa.me/2348137635064"
              target="_blank"
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
            >
              Get Free Consultation
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Service Detail Modal */}
      <Modal
        open={selectedService !== null}
        onClose={handleCloseModal}
        aria-labelledby="service-modal-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <AnimatePresence>
          {selectedService !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                outline: "none",
              }}
            >
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Close Button */}
                <IconButton
                  onClick={handleCloseModal}
                  aria-label="Close service details"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 10,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <Close />
                </IconButton>

                {/* Header Image */}
                <Box sx={{ position: "relative", height: 250 }}>
                  <AdvancedImage
                    cldImg={cld
                      .image(services[selectedService].publicId)
                      .resize(fill().width(800).height(300).gravity(autoGravity()))
                      .quality("auto:best")
                      .format("auto")}
                    alt={services[selectedService].title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(to bottom, transparent 0%, ${services[selectedService].color}60 100%)`,
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  {/* Header */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: `${services[selectedService].color}15`,
                        color: services[selectedService].color,
                        mr: 3,
                      }}
                    >
                      {services[selectedService].icon}
                    </Box>
                    <Box>
                      <Typography
                        component="h2"
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: services[selectedService].color,
                          fontSize: { xs: "1.5rem", md: "2rem" },
                        }}
                      >
                        {services[selectedService].title}
                      </Typography>
                      <Chip
                        label={services[selectedService].category}
                        size="small"
                        sx={{
                          mt: 1,
                          backgroundColor: `${services[selectedService].color}15`,
                          color: services[selectedService].color,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      lineHeight: 1.8,
                      fontSize: "1.125rem",
                      color: "text.primary",
                    }}
                  >
                    {services[selectedService].longDescription}
                  </Typography>

                  {/* Features */}
                  <Typography
                    component="h3"
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "text.primary",
                    }}
                  >
                    What's Included
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    {services[selectedService].features.map((feature, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CheckCircle
                            sx={{
                              color: services[selectedService].color,
                              mr: 2,
                              fontSize: "1.25rem",
                            }}
                          />
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {feature}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  {/* CTA */}
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      size="large"
                      href="https://wa.me/2348137635064"
                      target="_blank"
                      sx={{
                        px: 5,
                        py: 2,
                        borderRadius: "50px",
                        backgroundColor: services[selectedService].color,
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        "&:hover": {
                          backgroundColor: services[selectedService].color,
                          filter: "brightness(0.9)",
                          transform: "translateY(-2px)",
                        },
                      }}
                      endIcon={<ArrowForward />}
                    >
                      Inquire About This Service
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </Box>
  );
};

export default Services;