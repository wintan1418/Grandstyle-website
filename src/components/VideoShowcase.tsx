import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { head } from "framer-motion/client";

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              className="text-4xl font-bold mb-3 text-gray-800"
            >
              Our Events in Action
            </Typography>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the magic of our events through this highlight reel
              from our most memorable occasions
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="aspect-w-16 aspect-h-9 relative">
            <video
              ref={videoRef}
              className="w-full object-cover"
              poster="https://res.cloudinary.com/wintan1418/image/upload/v1754085289/gallery/Memorable_Birthday_Bashes_nc02bb.jpg"
              controls={isPlaying}
            >
              <source
                src="https://res.cloudinary.com/wintan1418/video/upload/v1757499126/featured/GRAND_STYLE_IMASAYI_CANOPY_1_ajynib.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                onClick={handleVideoPlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <PlayCircleIcon
                    style={{
                      fontSize: "6rem",
                      color: "white",
                      filter: "drop-shadow(0 0 8px rgba(0,0,0,0.4))",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>

          <div className="bg-white p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Crafting Unforgettable Moments
            </h3>
            <p className="text-gray-600">
              From intimate gatherings to grand celebrations, our team brings
              vision to life with precision and creativity.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
