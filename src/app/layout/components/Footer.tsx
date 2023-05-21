import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 50,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #dddddd",
      }}
    >
      © 2023 Khoa Công nghệ thông tin - Trường ĐH Công nghệ TP.HCM HUTECH
    </Box>
  );
};

export default Footer;
