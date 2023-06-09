import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { PaginationParams } from "../../../app/common/models/paginationPrams";
import { observer } from "mobx-react-lite";
import TypoLoading from "../../../app/layout/indicators/common/TypoLoading";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "role", headerName: "Thông Tin", width: 200 },
  { field: "username", headerName: "Tài Khoản", width: 200 },
  { field: "fullName", headerName: "Họ Tên", width: 300 },
  { field: "email", headerName: "Email", width: 400 },
];

const MemberList = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const { classroomStore } = useStore();
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    if (classroomId)
      classroomStore.get(classroomId).then(() => {
        classroomStore
          .loadClassroomUsers(new PaginationParams(1, 100, ""))
          .then(() => {
            if (classroomStore.classroomUsers)
              setRows(
                classroomStore.classroomUsers.map((m, i) => {
                  return {
                    id: i,
                    role: "Sinh Viên",
                    username: m.userName,
                    fullName: `${m.lastName} ${m.firstName}`,
                    email: m.email,
                  };
                })
              );
          });
      });
  }, [classroomId, classroomStore]);

  if (classroomStore.isDetailsLoading) return <TypoLoading />

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 4,
          border: "solid 2px #f5f5f5",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
            fontWeight: "bold",
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default observer(MemberList);
