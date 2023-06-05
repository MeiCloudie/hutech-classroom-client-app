import { Box, Divider, Typography } from "@mui/material";
import ProjectLayout from "../layout/ProjectLayout";
import CreateEditDialog from "../../../../common/UI/CreateEditDialog";
import AddIcon from "@mui/icons-material/Add";
import ProjectList from "./ProjectList";
import ProjectForm from "./form/ProjectForm";

const ProjectPage = () => {
  return (
    <Box>
      <ProjectLayout
        component={
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                  textAlign: "start",
                }}
                mt={1}
              >
                DỰ ÁN
              </Typography>

              <CreateEditDialog
                iconButton={<AddIcon />}
                titleButton="TẠO DỰ ÁN"
                titleDialog="TẠO DỰ ÁN"
                formComponent={(handleClose) => (
                  <ProjectForm handleClose={handleClose} />
                )}
              />
            </Box>

            <Divider />

            <ProjectList />
          </Box>
        }
      />
    </Box>
  );
};

export default ProjectPage;
