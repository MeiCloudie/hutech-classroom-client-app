import { Box, Typography } from "@mui/material";
import EntityForm from "../../../../common/forms/EntityForm";
import { useStore } from "../../../../../app/stores/store";

import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Group, GroupFormValues } from "../../../../../app/models/Group";
import GroupMembersForm from "./GroupMembersForm";
import { observer } from "mobx-react-lite";

interface GroupFormProps {
  handleClose: () => void;
  group?: Group;
}

const GroupForm = (props: GroupFormProps) => {
  const { classroomId, groupId } = useParams<{
    classroomId: string;
    groupId: string;
  }>();
  const { groupStore, classroomStore } = useStore();
  const [groupFormValues, setGroupFormValues] = useState<GroupFormValues>(
    new GroupFormValues()
  );
  const [classroomUserOptions, setClassroomUserOptions] = useState<
    { label: string; value: any }[]
  >([]);

  const loadGroupUsers = useCallback(() => {
    if (props.group) {
      if (groupStore.selectedItem) {
        const formValues = new GroupFormValues(groupStore.selectedItem);
        formValues.leaderId = props.group.leader?.id;
        setGroupFormValues(formValues);
      }
    } else if (groupId) {
      groupStore.get(groupId).then(() => {
        if (groupStore.selectedItem) {
          setGroupFormValues(new GroupFormValues(groupStore.selectedItem));
        }
      });
    }
  }, [groupId, groupStore, props.group]);

  const loadClassroomUsers = useCallback(() => {
    classroomStore.loadClassroomUsers().then(() => {
      loadGroupUsers();
      setClassroomUserOptions(
        classroomStore.classroomUsers
          .filter(
            (u) =>
              u.groups.some((g) => g.id === groupId) ||
              u.groups.length === 0 ||
              u.id === props.group?.leader?.id
          )
          .map((c) => ({
            label: c.lastName + " " + c.firstName,
            value: c.id,
          }))
      );
    });
  }, [classroomStore, groupId, loadGroupUsers, props.group?.leader?.id]);

  useEffect(() => {
    // if (!props.group && !groupId) {
    if (!classroomStore.selectedItem) {
      if (classroomId) {
        classroomStore.get(classroomId).then(() => {
          loadClassroomUsers();
        });
      }
    } else {
      loadClassroomUsers();
    }
  }, [
    classroomId,
    classroomStore,
    groupId,
    groupStore,
    loadClassroomUsers,
    loadGroupUsers,
    props.group,
  ]);

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
            // groupFormValues.id
            //   ? []
            //   : [
            //       {
            //         fieldKey: "leaderId",
            //         options: classroomUserOptions,
            //       },
            //     ]
            [
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
          // excludeFields={["classroomId", groupFormValues.id ? "leaderId" : ""]}
          excludeFields={["classroomId"]}
          onSubmit={(entityFormValues) => {
            if (entityFormValues.id) {
              groupStore
                .update(entityFormValues.id, entityFormValues)
                .then(() => {
                  if (entityFormValues.leaderId) groupStore.addLeader(entityFormValues.leaderId).then(() => {
                    props.handleClose();
                  })
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
      </Box>
      {groupFormValues.id && (
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <GroupMembersForm
            classroomUsers={classroomStore.classroomUsers}
            groupUsers={props.group?.groupUsers ?? []}
            group={props.group}
          />
        </Box>
      )}
    </Box>
  );
};

export default observer(GroupForm);
