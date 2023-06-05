import { Box, Typography } from "@mui/material";

import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../../../../../app/stores/store";
import {
  Project,
  ProjectFormValues,
} from "../../../../../../app/models/Project";
import EntityForm from "../../../../../common/forms/EntityForm";

interface ProjectFormProps {
  handleClose: () => void;
  project?: Project;
}

const ProjectForm = (props: ProjectFormProps) => {
  const { groupId, projectId } = useParams<{
    groupId: string;
    projectId: string;
  }>();
  const { projectStore } = useStore();
  const [projectFormValues, setProjectFormValues] = useState<ProjectFormValues>(
    new ProjectFormValues()
  );

  useEffect(() => {
    if (props.project)
      setProjectFormValues(new ProjectFormValues(props.project));
    else if (projectId)
      projectStore.get(projectId).then(() => {
        if (projectStore.selectedItem) {
          setProjectFormValues(
            new ProjectFormValues(projectStore.selectedItem)
          );
        }
      });
  }, [projectId, projectStore, props.project]);

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        width: "100%",
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: (theme) => theme.palette.primary.main,
          textAlign: "center",
        }}
      >
        THÔNG TIN DỰ ÁN
      </Typography>
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <EntityForm<ProjectFormValues>
          initialEntityFormValues={projectFormValues}
          selectionFields={[]}
          validateObject={{
            name: Yup.string()
              .required("Tên không được để trống!")
              .max(100, "Tên không được vượt quá 100 ký tự!"),
            description: Yup.string().max(
              2000,
              "Mô tả không được vượt quá 2000 ký tự!"
            ),
          }}
          fieldConfigs={[
            {
              fieldKey: "name",
              props: {
                label: "Tên Nhóm",
                placeholder: "Hãy nhập tên nhóm tại đây!",
              },
            },
            {
              fieldKey: "description",
              props: {
                label: "Mô Tả Nhóm",
                placeholder: "Hãy nhập mô tả nhóm tại đây!",
                rows: 5,
              },
            },
          ]}
          excludeFields={["groupId"]}
          onSubmit={(entityFormValues) => {
            if (entityFormValues.id) {
              projectStore
                .update(entityFormValues.id, entityFormValues)
                .then(() => {
                  props.handleClose();
                });
            } else {
              projectStore.create(entityFormValues).then(() => {
                props.handleClose();
              });
            }
          }}
          onCancel={props.handleClose}
          onSetAdditionalValues={(projectFormValues) => {
            projectFormValues.groupId = groupId;
          }}
        />
      </Box>
    </Box>
  );
};

export default ProjectForm;
