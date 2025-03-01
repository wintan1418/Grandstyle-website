import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const itemData = [
  {
    img: "../gallery/Event Hall.jpg",
    title: "Event Hall",
  },
  {
    img: "../gallery/Nigerian Party.jpg",
    title: "Nigerian Party",
  },
  {
    img: "../gallery/Security.jpg",
    title: "Security",
  },
  {
    img: "../gallery/Waitress.jpg",
    title: "Waitress",
  },
  {
    img: "../gallery/Corporate Event.jpg",
    title: "Corporate Event",
  },
  {
    img: "../gallery/Wedding.jpg",
    title: "Wedding",
  },
  {
    img: "../gallery/Concert.jpg",
    title: "Concert",
  },
  {
    img: "../gallery/Gala Dinner.jpg",
    title: "Gala Dinner",
  },
  {
    img: "../gallery/Cultural Festival.jpg",
    title: "Cultural Festival",
  },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewingLightbox, setViewingLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<Item | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + itemData.length) % itemData.length
    );
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  interface Item {
    img: string;
    title: string;
  }

  const openLightbox = (item: Item): void => {
    setLightboxImage(item);
    setViewingLightbox(true);
  };

  const closeLightbox = () => {
    setViewingLightbox(false);
    setLightboxImage(null);
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Typography
            variant="h3"
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Event Gallery</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-blue-200 opacity-50 z-0"></span>
            </span>
          </Typography>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            Explore our diverse portfolio of events, from vibrant Nigerian
            parties to elegant corporate gatherings. Each image tells a story of
            joy, celebration, and impeccable planning.
          </p>
        </motion.div>

        {/* Main Gallery Section */}
        <div className="relative mt-12">
          {/* Gallery Grid for larger screens */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itemData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
                onClick={() => openLightbox(item)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer">
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-medium text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel for mobile screens */}
          <div className="md:hidden relative">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {itemData.map((item, index) => (
                  <div key={index} className="min-w-full px-4">
                    <div className="relative rounded-xl overflow-hidden shadow-lg aspect-w-16 aspect-h-9">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white font-medium text-lg">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-md text-blue-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex space-x-2">
                {itemData.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-md text-blue-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* View All Events Button */}
        {/* <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Events
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.button>
        </div> */}
      </div>

      {/* Lightbox */}
      {viewingLightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white p-2"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={lightboxImage?.img}
              alt={lightboxImage?.title}
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-semibold">{lightboxImage?.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
