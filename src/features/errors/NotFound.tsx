import { Link } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function NotFound() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <SearchIcon sx={{ mr: 1, fontSize: 150 }} />
      <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 600 }}>
        404 - PAGE NOT FOUND
      </Typography>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Rất tiếc - chúng tôi đã tìm mọi nơi nhưng không thể tìm thấy những gì
        bạn đang tìm kiếm!
      </Typography>
      <Button variant="contained" component={Link} to="/home">
        TRỞ VỀ TRANG CHỦ
      </Button>
    </Container>
  );
}
