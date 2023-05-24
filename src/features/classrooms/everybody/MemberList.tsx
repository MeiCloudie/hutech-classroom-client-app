import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Profile from "../../../app/common/models/Profile";

const members: Profile[] = [
  {
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "role", headerName: "Thông Tin", width: 200 },
  { field: "username", headerName: "Tài Khoản", width: 200 },
  { field: "fullName", headerName: "Họ Tên", width: 300 },
  { field: "email", headerName: "Email", width: 400 },
];

const rows = members.map((m, i) => {
  return {
    id: i,
    role: "Sinh Viên",
    username: m.userName,
    fullName: `${m.firstName} ${m.lastName}`,
    email: m.email,
  };
});

const MemberList = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 4,
          border: "solid 2px #f5f5f5",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
            fontWeight: "bold"
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
};

export default MemberList;
