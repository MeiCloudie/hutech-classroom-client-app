import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useStore } from "../../../app/stores/store"
import { PaginationParams } from "../../../app/common/models/paginationPrams"
import { observer } from "mobx-react-lite"
import TypoLoading from "../../../app/layout/indicators/common/TypoLoading"
import { Divider } from "@mui/material"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "role", headerName: "Thông Tin", width: 200 },
  { field: "username", headerName: "Tài Khoản", width: 200 },
  { field: "lastName", headerName: "Họ", width: 200 },
  { field: "firstName", headerName: "Tên", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "groups", headerName: "Nhóm", width: 200 },
]

const MemberList = () => {
  const { classroomId } = useParams<{ classroomId: string }>()
  const { classroomStore } = useStore()
  const [rows, setRows] = useState<GridRowsProp>([])

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
                    role: m.groups.map((g) => g.leader?.id).includes(m.id)
                      ? "Nhóm Trưởng"
                      : "Sinh Viên",
                    username: m.userName,
                    lastName: `${m.lastName}`,
                    firstName: `${m.firstName}`,
                    email: m.email,
                    groups: m.groups.map((g) => g.name).join(", "),
                  }
                })
              )
          })
      })
  }, [classroomId, classroomStore])

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
        slots={{
          toolbar: (props) => (
            <>
              <GridToolbar {...props} />
              <Divider />
            </>
          ),
        }}
        slotProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
          },
        }}
      />
    </div>
  )
}

export default observer(MemberList)
