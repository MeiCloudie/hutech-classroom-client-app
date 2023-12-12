import { useEffect } from "react"
import ClassroomCard from "./ClassroomCard"

import { Grid, styled } from "@mui/material"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"
import PlaceholderBox from "../../common/UI/PlaceholderBox"
import ClassroomCardSkeleton from "../../../app/layout/indicators/cards/ClassroomCardSkeleton"
import { PaginationParams } from "../../../app/common/models/paginationPrams"

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    "& .MuiGrid-item": {
      width: "100%",
    },
  },
  [theme.breakpoints.only("sm")]: {
    "& .MuiGrid-item": {
      width: "50%",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiGrid-item": {
      width: "33.33%",
    },
  },
}))

const ClassroomList = () => {
  const { classroomStore, commonStore } = useStore()
  // const [classrooms, setClassrooms] = useState<Classroom[]>([])

  useEffect(() => {
    classroomStore
      .loadUserRelatedItems(
        new PaginationParams(1, 10, commonStore.searchString)
      )
      .then(() => {
        // setClassrooms(classroomStore.items)
      })
  }, [classroomStore, commonStore])

  if (classroomStore.isListLoading)
    return (
      <ResponsiveGrid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClassroomCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClassroomCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClassroomCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClassroomCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClassroomCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClassroomCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClassroomCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClassroomCardSkeleton />
        </Grid>
      </ResponsiveGrid>
    )

  return (
    <ResponsiveGrid container spacing={2}>
      {classroomStore.items.length === 0 ? (
        <PlaceholderBox
          title="Đây là nơi xem và quản lý danh sách lớp học"
          subtitle="Hiện tài khoản của bạn chưa được tham gia vào các lớp học!"
        />
      ) : (
        classroomStore.items.map((c, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ClassroomCard key={index} classroom={c} />
          </Grid>
        ))
      )}
    </ResponsiveGrid>
  )
}

export default observer(ClassroomList)
