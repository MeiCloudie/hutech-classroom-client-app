import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

interface HelpCardProps {
    title: string;
    icon: React.ReactNode;
    link: string;
}

const HelpCard = (props: HelpCardProps) => {
  return (
    <Card
      sx={{
        minWidth: 250,
        borderWidth: 2,
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
      }}
      variant="outlined"
    >
      <CardContent>
        {props.icon}
        <Typography variant="h6" color="#101331">
          {props.title}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx= {{ justifyContent: "center" }}>
        <Button component={Link} to={props.link}>ĐẾN TRANG</Button>
      </CardActions>
    </Card>
  );
}

export default HelpCard;