import { Box, Button, Divider, Typography } from "@mui/material"
import MiniDetailsLayout from "../layout/MiniDetailsLayout"
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useStore } from "../../../app/stores/store"
import TypoLoading from "../../../app/layout/indicators/common/TypoLoading"
import { PaginationParams } from "../../../app/common/models/paginationPrams"
import AlertDialog from "../../common/UI/AlertDialog"
import DeleteIcon from "@mui/icons-material/Delete"
import { observer } from "mobx-react-lite"

const ScoreTypePage = () => {
  const { scoreTypeStore } = useStore()
  const [rows, setRows] = useState<GridRowsProp>([])

  const columns: GridColDef[] = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Cột Điểm", width: 250 },
    {
      field: "actions",
      headerName: "Hành Động",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const scoreTypeId = params.row.id
        return (
          <Box>
            <Button>Sửa</Button>
            <AlertDialog
              iconButton={<DeleteIcon />}
              titleButton="XOÁ"
              alertDialogTitle="Xoá cột điểm?"
              alertDialogDescription="Tất cả thông tin của cột điểm cũng sẽ bị xoá"
              negation="Huỷ"
              affirmation="Xoá"
              onSubmit={() => {
                if (scoreTypeId) scoreTypeStore.delete(scoreTypeId).then()
                //! Chưa Refetch lại
              }}
            />
          </Box>
        )
      },
    },
  ]

  useEffect(() => {
    scoreTypeStore.load(new PaginationParams(1, 100, "")).then(() => {
      setRows(
        scoreTypeStore.items.map((m, i) => {
          return {
            stt: i + 1,
            id: m.id,
            name: m.name,
          }
        })
      )
    })
  }, [scoreTypeStore])

  if (scoreTypeStore.isDetailsLoading) return <TypoLoading />

  return (
    <Box>
      <MiniDetailsLayout
        component={
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              p: 2,
              mb: 2,
              border: "1px solid #e8e8e8",
              borderRadius: "5px",
              transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                transform: "translateY(-4px)",
              },
              textAlign: "start",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: (theme) => theme.palette.primary.main,
                textAlign: "start",
              }}
            >
              DANH SÁCH CÁC CỘT ĐIỂM
            </Typography>
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
          </Box>
        }
      />
    </Box>
  )
}

export default observer(ScoreTypePage)
