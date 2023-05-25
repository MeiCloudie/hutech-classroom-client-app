import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";

const data = [
  {
    stt: 1,
    name: "Trường Đại học Công nghệ Tp.HCM",
    link: "https://www.facebook.com/hutechuniversity/",
  },
  {
    stt: 2,
    name: "Phòng Công tác Sinh viên",
    link: "https://www.facebook.com/pctsvhutech",
  },
  {
    stt: 3,
    name: "Đoàn Thanh Niên - Hội Sinh Viên",
    link: "https://www.facebook.com/tuoitrehutech",
  },
  {
    stt: 4,
    name: "Phòng Đào Tạo - Khảo Thí",
    link: "http://nopdon.daotao.hutech.edu.vn/",
  },
  {
    stt: 5,
    name: "Phòng Tài Chính",
    link: "https://www.facebook.com/PhongTaiChinhHUTECH/",
  },
  {
    stt: 6,
    name: "Trung Tâm Đào Tạo Nhân Lực Chất Lượng Cao",
    link: "https://www.facebook.com/pctsvcsE",
  },
  {
    stt: 7,
    name: "Trung tâm Văn hoá Nghệ thuật",
    link: "https://www.facebook.com/TrungTamVanHoaNgheThuat",
  },
  {
    stt: 8,
    name: "Trung tâm Tin học Ngoại ngữ Kỹ năng",
    link: "https://www.facebook.com/TrungtamTHNNKNHutech",
  },
  {
    stt: 9,
    name: "Đội Hỗ trợ Sinh viên HUTECH",
    link: "https://www.facebook.com/doihotrosinhvien",
  },
  {
    stt: 10,
    name: "Đội An ninh trật tự HUTECH",
    link: "https://www.facebook.com/HUTECHANTT",
  },
  {
    stt: 11,
    name: "CLB Tình nguyện viên HUTECH",
    link: "https://www.facebook.com/tinhnguyenhutech",
  },
  {
    stt: 12,
    name: "Đội Công tác xã hội HUTECH",
    link: "https://www.facebook.com/congtacxahoihutech",
  },
  {
    stt: 13,
    name: "Đội Hỗ trợ Truyền thông & Sự kiện C.E.T",
    link: "https://www.facebook.com/c.e.t.hutech",
  },
  {
    stt: 14,
    name: "Đội Thanh Niên Xung Kích",
    link: "https://www.facebook.com/tnxk.hutech",
  },
  {
    stt: 15,
    name: "CLB Tình nguyện AKIKO",
    link: "https://www.facebook.com/clbakikovjit",
  },
  {
    stt: 16,
    name: "CLB Thể dục thể thao",
    link: "https://www.facebook.com/thethaoHUTECH",
  },
];

const LinkPage = () => {
  return (
    <React.Fragment>
      <h1>LIÊN KẾT HỖ TRỢ SINH VIÊN</h1>
      <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff", boxShadow: 6, }}>
        <Table sx={{ border: "4px solid #101331" }}>
          <TableHead sx={{ backgroundColor: "#ffc80f" }}>
            <TableRow>
              <TableCell sx={{ borderBottom: "2px solid #101331" }}>
                STT
              </TableCell>
              <TableCell sx={{ borderBottom: "2px solid #101331" }}>
                TÊN ĐƠN VỊ
              </TableCell>
              <TableCell sx={{ borderBottom: "2px solid #101331" }}>
                LINK
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.stt}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>{row.stt}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <a href={row.link} target="_blank" rel="noopener noreferrer">
                    {row.link}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default LinkPage;
