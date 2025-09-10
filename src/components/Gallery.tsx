import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Modal,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "wintan1418",
  },
});

const itemData = [
  {
    publicId: "gallery/burial_seremony_agw5rw",
    title: "burial ceremony",
  },
  {
    publicId: "gallery/Nigerian Party",
    title: "Nigerian Party",
  },
  {
    publicId: "gallery/dn5zl1cth2u7tigeccjx",
    title: "Security",
  },
  {
    publicId: "gallery/Waitress",
    title: "Waitress",
  },
  {
    publicId: "gallery/Corporate Event",
    title: "Corporate Event",
  },
  {
    publicId: "gallery/Wedding",
    title: "Wedding",
  },
  {
    publicId: "gallery/concert",
    title: "Concert",
  },
  {
    publicId: "gallery/Gala Dinner",
    title: "Gala Dinner",
  },
  {
    publicId: "gallery/Cultural Festival",
    title: "Cultural Festival",
  },
  {
    publicId: "gallery/bamqjbs2skqkh3pa9zxk",
    title: "Event Setup Awards",
  },
  {
    publicId: "gallery/jkncqcyke3nr5p0o7jmb",
    title: "Event team",
  },
  {
    publicId: "gallery/reboufxgfqb5n1kl0vmk",
    title: "event team",
  },
  {
    publicId: "gallery/xkmx6u0bdzl8gpq9d2v3",
    title: "Venue Setup",
  },
  {
    publicId: "gallery/hd7vrbwpcup85pjpieso",
    title: "Event team photoshot",
  },
  {
    publicId: "gallery/u0tlax6idodnt8vaopic",
    title: "event gallery",
  },
  {
    publicId: "gallery/fxo9fxeemjrimlqsnkuv",
    title: "event cordinator",
  },
  {
    publicId: "gallery/i1ly2na9kiiseqnthj73",
    title: "event team of the year",
  },
  {
    publicId: "gallery/e7vc3au9v5tzpryrol85",
    title: "security team",
  },
  {
    publicId: "gallery/bwfxdekqocjmwlwpvdnp",
    title: "security on guard",
  },
  {
    publicId: "gallery/deejigubdsv22dfpiwvl",
    title: "menu and cutlery",
  },
  {
    publicId: "gallery/skks75eufxbe6ee2itdi",
    title: "fun attendees",
  },
  
];

const Gallery: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
    <Box id="gallery" className="py-12 bg-gray-50">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="mb-8 text-center font-extrabold text-primary"
        >
          Event Gallery
        </Typography>
        <Typography
          variant="body1"
          className="text-center text-gray-600 text-lg"
        >
          Explore our diverse portfolio of events, from vibrant Nigerian parties
          to elegant corporate gatherings. Each image tells a story of joy,
          celebration, and impeccable planning.
        </Typography>

        <Box className="flex justify-center mb-8">
          <button
            onClick={handleOpenModal}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
          >
            View All Gallery
          </button>
        </Box>

        <Slider {...settings}>
          {itemData.map((item) => (
            <div key={item.publicId} className="px-4 mt-8">
              <div className="relative group">
                <AdvancedImage
                  cldImg={cld
                    .image(item.publicId)
                    .resize(
                      fill().width(600).height(400).gravity(autoGravity())
                    )
                    .quality("auto")
                    .format("auto")}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <Typography
                  variant="h6"
                  className="mt-4 text-center font-semibold text-secondary group-hover:text-primary"
                >
                  {item.title}
                </Typography>
              </div>
            </div>
          ))}
        </Slider>

        {/* Modal for displaying all gallery images */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="gallery-modal"
          aria-describedby="all-gallery-images"
        >
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
            <Box className="flex justify-between items-center mb-6">
              <Typography variant="h4" className="font-bold text-primary">
                Complete Gallery
              </Typography>
              <IconButton onClick={handleCloseModal} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>

            <Grid container spacing={3}>
              {itemData.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.publicId}>
                  <Box className="mb-4">
                    <AdvancedImage
                      cldImg={cld
                        .image(item.publicId)
                        .resize(
                          fill().width(400).height(300).gravity(autoGravity())
                        )
                        .quality("auto")
                        .format("auto")}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                    />
                    <Typography
                      variant="subtitle1"
                      className="mt-2 text-center font-medium text-secondary"
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default Gallery;
