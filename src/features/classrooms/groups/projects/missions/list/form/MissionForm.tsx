import { Box, Typography } from "@mui/material";

import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  Mission,
  MissionFormValues,
} from "../../../../../../../app/models/Mission";
import { useStore } from "../../../../../../../app/stores/store";
import EntityForm from "../../../../../../common/forms/EntityForm";
import { InputType } from "../../../../../../../app/layout/enums/InputTypes";
import MiniGroupDetails from "../../../layout/MiniGroupDetails";
import MiniProjectDetails from "../../layout/MiniProjectDetails";
import MissionMembersForm from "./MissionMembersForm";

interface MissionFormProps {
  handleClose: () => void;
  mission?: Mission;
}

const MissionForm = (props: MissionFormProps) => {
  const { projectId, missionId, groupId } = useParams<{
    projectId: string;
    missionId: string;
    groupId: string;
  }>();
  const { missionStore, groupStore } = useStore();
  const [missionFormValues, setMissionFormValues] = useState<MissionFormValues>(
    new MissionFormValues()
  );

  const loadMissionUsers = useCallback(() => {
    if (props.mission)
      if (missionStore.selectedItem) {
        setMissionFormValues(new MissionFormValues(missionStore.selectedItem));
      } else if (missionId)
        missionStore.get(missionId).then(() => {
          if (missionStore.selectedItem) {
            if (missionStore.selectedItem) {
              setMissionFormValues(
                new MissionFormValues(missionStore.selectedItem)
              );
            }
          }
        });
  }, [missionId, missionStore, props.mission]);

  const loadGroupUsers = useCallback(() => {
    groupStore.loadGroupUsers().then(() => loadMissionUsers());
  }, [groupStore, loadMissionUsers]);

  useEffect(() => {
    if (!groupStore.selectedItem) {
      if (groupId) {
        groupStore.get(groupId).then(() => {
          loadGroupUsers();
        });
      }
    } else {
      loadGroupUsers();
    }
  }, [
    missionId,
    missionStore,
    props.mission,
    groupId,
    groupStore,
    loadGroupUsers,
    loadMissionUsers,
  ]);

  return (
    <Box>
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
          THÔNG TIN NHIỆM VỤ
        </Typography>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <EntityForm<MissionFormValues>
            initialEntityFormValues={missionFormValues}
            selectionFields={[]}
            validateObject={{
              title: Yup.string()
                .required("Tên không được để trống!")
                .max(100, "Tên không được vượt quá 100 ký tự!"),
              description: Yup.string().max(
                100,
                "Mô tả không được vượt quá 100 ký tự!"
              ),
            }}
            fieldConfigs={[
              {
                fieldKey: "title",
                props: {
                  label: "Tiêu đề nhiệm vụ",
                  placeholder: "Hãy nhập tiêu đề nhiệm vụ tại đây!",
                },
              },
              {
                fieldKey: "description",
                props: {
                  label: "Mô Tả nhiệm vụ",
                  placeholder: "Hãy nhập mô tả nhiệm vụ tại đây!",
                  type: InputType.Textarea,
                },
              },
              {
                fieldKey: "isDone",
                props: {
                  label: "Trạng thái hoàn thành",
                  placeholder: "Hãy chọn trạng thái hoàn thành tại đây!",
                },
              },
            ]}
            excludeFields={["projectId"]}
            onSubmit={(entityFormValues) => {
              if (entityFormValues.id) {
                missionStore
                  .update(entityFormValues.id, entityFormValues)
                  .then(() => {
                    props.handleClose();
                  });
              } else {
                missionStore.create(entityFormValues).then(() => {
                  props.handleClose();
                });
              }
            }}
            onCancel={props.handleClose}
            onSetAdditionalValues={(missionFormValues) => {
              missionFormValues.projectId = projectId;
            }}
          />
        </Box>
        {missionFormValues.id && (
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            <MissionMembersForm
              groupUsers={groupStore.groupUsers}
              missionUsers={props.mission?.missionUsers ?? []}
            />
          </Box>
        )}
      </Box>
      <MiniGroupDetails />
      <MiniProjectDetails />
    </Box>
  );
};

export default MissionForm;
