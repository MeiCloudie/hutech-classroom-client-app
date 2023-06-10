import { Box, Typography } from "@mui/material";
import EntityForm from "../../../../common/forms/EntityForm";
import { useStore } from "../../../../../app/stores/store";

import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Group, GroupFormValues } from "../../../../../app/models/Group";
import AddGroupMembersForm from "./AddGroupMembersForm";

interface GroupFormProps {
  handleClose: () => void;
  group?: Group;
}

const GroupForm = (props: GroupFormProps) => {
  const { classroomStore } = useStore();
  const { classroomId, groupId } = useParams<{
    classroomId: string;
    groupId: string;
  }>();
  const { groupStore } = useStore();
  const [groupFormValues, setGroupFormValues] = useState<GroupFormValues>(
    new GroupFormValues()
  );
  const [classroomUserOptions, setClassroomUserOptions] = useState<
    { label: string; value: any }[]
  >([]);

  useEffect(() => {
    // if (!props.group && !groupId) {
    if (!classroomStore.selectedItem) {
      if (classroomId)
        classroomStore.get(classroomId).then(() => {
          classroomStore.loadClassroomUsers().then(() => {
            setClassroomUserOptions(
              classroomStore.classroomUsers.map((c) => ({
                label: c.userName,
                value: c.id,
              }))
            );
          });
        });
    } else {
      classroomStore.loadClassroomUsers().then(() => {
        setClassroomUserOptions(
          classroomStore.classroomUsers.map((c) => ({
            label: c.userName,
            value: c.id,
          }))
        );
      });
    }
    // }
    if (props.group) setGroupFormValues(new GroupFormValues(props.group));
    else if (groupId)
      groupStore.get(groupId).then(() => {
        if (groupStore.selectedItem) {
          setGroupFormValues(new GroupFormValues(groupStore.selectedItem));
        }
      });
  }, [classroomId, classroomStore, groupId, groupStore, props.group]);

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
        THÔNG TIN NHÓM
      </Typography>
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <EntityForm<GroupFormValues>
          initialEntityFormValues={groupFormValues}
          selectionFields={
            groupFormValues.id
              ? []
              : [
                  {
                    fieldKey: "leaderId",
                    options: classroomUserOptions,
                  },
                ]
          }
          validateObject={{
            name: Yup.string()
              .required("Tên không được để trống!")
              .max(100, "Tên không được vượt quá 100 ký tự!"),
            description: Yup.string().max(
              3000,
              "Mô tả không được vượt quá 3000 ký tự!"
            ),
            leaderId: groupFormValues.id
              ? null
              : Yup.string().required("Nhóm trưởng không được để trống!"),
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
            {
              fieldKey: "leaderId",
              props: {
                label: "Nhóm Trưởng",
                placeholder: "Hãy chọn nhóm trưởng tại đây!",
              },
            },
          ]}
          excludeFields={["classroomId", groupFormValues.id ? "leaderId" : ""]}
          onSubmit={(entityFormValues) => {
            if (entityFormValues.id) {
              groupStore
                .update(entityFormValues.id, entityFormValues)
                .then(() => {
                  props.handleClose();
                });
            } else {
              groupStore.create(entityFormValues).then(() => {
                props.handleClose();
              });
            }
          }}
          onCancel={props.handleClose}
          onSetAdditionalValues={(groupFormValues) => {
            groupFormValues.classroomId = classroomId;
          }}
        />
        <AddGroupMembersForm 
          classroomUsers={classroomStore.classroomUsers}
        />
      </Box>
    </Box>
  );
};

export default GroupForm;
