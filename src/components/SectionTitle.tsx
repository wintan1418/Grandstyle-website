import React from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  color?: "primary" | "secondary" | "white";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  description,
  align = "center",
  color = "primary",
}) => {
  const getColor = () => {
    switch (color) {
      case "secondary":
        return "secondary.main";
      case "white":
        return "white";
      default:
        return "primary.main";
    }
  };

  return (
    <Box sx={{ textAlign: align, mb: { xs: 4, md: 6 } }}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "success.main",
              fontSize: { xs: "0.875rem", md: "1rem" },
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 2,
              mb: 2,
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Typography
          component="h2"
          variant="h2"
          sx={{
            color: getColor(),
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
            lineHeight: 1.2,
            mb: description ? 3 : 0,
          }}
        >
          {title}
        </Typography>
      </motion.div>

      {description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: color === "white" ? "grey.300" : "text.secondary",
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.8,
              maxWidth: "800px",
              mx: align === "center" ? "auto" : 0,
            }}
          >
            {description}
          </Typography>
        </motion.div>
      )}

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ originX: align === "center" ? 0.5 : 0 }}
      >
        <Box
          sx={{
            mt: 3,
            height: 4,
            width: 80,
            background: `linear-gradient(90deg, ${getColor()} 0%, transparent 100%)`,
            borderRadius: 2,
            mx: align === "center" ? "auto" : 0,
          }}
        />
      </motion.div>
    </Box>
  );
};

export default SectionTitle;