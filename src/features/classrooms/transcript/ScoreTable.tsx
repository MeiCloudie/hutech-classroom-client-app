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
  { field: "id", headerName: "STT", width: 70 },
  { field: "username", headerName: "Mã SV", width: 120 },
  { field: "lastName", headerName: "Họ SV", width: 200 },
  { field: "firstName", headerName: "Tên SV", width: 100 },
  { field: "class", headerName: "Mã lớp", width: 120 },
  { field: "score1", headerName: "Cột 1", width: 100 },
]

const ScoreTable = () => {
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
                    id: i + 1,
                    username: m.userName,
                    lastName: `${m.lastName}`,
                    firstName: `${m.firstName}`,
                    //TODO: Thêm các thuộc tính còn lại
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

export default observer(ScoreTable)
