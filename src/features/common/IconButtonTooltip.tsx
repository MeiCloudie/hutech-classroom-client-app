import { IconButton, Tooltip } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

interface IconButtonTooltipProps {
  titleTooltip: string;
  ariaLabel: string;
  icon: React.ReactNode;
  link: string;
}

const IconButtonTooltip = (props: IconButtonTooltipProps) => {
  return (
    <Tooltip title={props.titleTooltip} placement="bottom-start" arrow>
      <IconButton
        aria-label={props.ariaLabel}
        sx={{
          transition: "color 0.2s",
          "&:hover": {
            color: blue[800],
          },
        }}
        component={Link}
        to={props.link}
      >
        {props.icon}
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonTooltip;
