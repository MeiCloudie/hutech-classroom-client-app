import React from "react";
import GroupList from "./GroupList";
import CreateEditDialog from "../../../common/UI/CreateEditDialog";
import AddIcon from "@mui/icons-material/Add";
import GroupForm from "./form/GroupForm";
import { Box, Divider, Typography } from "@mui/material";
import { useStore } from "../../../../app/stores/store";

const GroupPage = () => {
  const { userStore } = useStore();
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
            textAlign: "start",
          }}
          mt={1}
        >
          NHÓM
        </Typography>

        <CreateEditDialog
          disabled={!userStore.isLecturer}
          iconButton={<AddIcon />}
          titleButton="TẠO NHÓM"
          titleDialog="TẠO NHÓM"
          formComponent={(handleClose) => (
            <GroupForm handleClose={handleClose} />
          )}
        />
      </Box>

      <Divider />

      <Box sx={{ mt: 2 }}>
        <GroupList />
      </Box>
    </Box>
  );
};

export default GroupPage;
