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

const ScoreTable = () => {
  const { classroomId } = useParams<{ classroomId: string }>()
  const { classroomStore } = useStore()
  const [rows, setRows] = useState<GridRowsProp>([])

  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 70 },
    { field: "username", headerName: "Mã SV", width: 120 },
    { field: "lastName", headerName: "Họ SV", width: 200 },
    { field: "firstName", headerName: "Tên SV", width: 100 },
    { field: "class", headerName: "Mã lớp", width: 120 },
    {
      field: "1",
      headerName: "Điểm quá trình",
      width: 150,
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "2",
      headerName: "Điểm cuối kỳ",
      width: 100,
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
  ]

  useEffect(() => {
    if (classroomId)
      classroomStore.get(classroomId).then(() => {
        classroomStore
          .loadClassroomClassroomScores(new PaginationParams(1, 100, ""))
          .then(() => {
            if (classroomStore.classroomScores)
              setRows(
                classroomStore.classroomScores.map((m, i) => {
                  return {
                    id: i + 1,
                    username: m.student?.userName ?? "",
                    lastName: `${m.student?.lastName ?? ""}`,
                    firstName: `${m.student?.firstName ?? ""}`,
                    class: `${m.classroom?.class}`,
                      ...m.scores.reduce((dictionary: {[key: number]: number}, element, index) => (dictionary[element.scoreType?.id ?? 0] = m.scores[index].score, dictionary),
                      {})
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
