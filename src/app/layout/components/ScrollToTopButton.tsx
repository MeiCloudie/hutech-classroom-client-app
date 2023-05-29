import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Tooltip } from "@mui/material";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button when scrolling down
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {isVisible && (
        <Tooltip title="Lên đầu trang" placement="left" arrow>
          <Fab color="primary" aria-label="Scroll to top" onClick={scrollToTop}>
            <KeyboardArrowUpIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
};

export default ScrollToTopButton;
