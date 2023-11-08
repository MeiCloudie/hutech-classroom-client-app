import { Box, Typography } from "@mui/material"
import * as Yup from "yup"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  ScoreType,
  ScoreTypeFormValues,
} from "../../../../app/models/ScoreType"
import { useStore } from "../../../../app/stores/store"
import EntityForm from "../../../common/forms/EntityForm"

interface ScoreTypeFormProps {
  handleClose: () => void
  scoreType?: ScoreType
}

const ScoreTypeForm = (props: ScoreTypeFormProps) => {
  const { scoreTypeId } = useParams<{
    scoreTypeId: string
  }>()
  const { scoreTypeStore } = useStore()
  const [scoreTypeFormValues, setScoreTypeFormValues] =
    useState<ScoreTypeFormValues>(new ScoreTypeFormValues())

  useEffect(() => {
    if (props.scoreType)
      setScoreTypeFormValues(new ScoreTypeFormValues(props.scoreType))
    else if (scoreTypeId)
      scoreTypeStore.get(scoreTypeId).then(() => {
        if (scoreTypeStore.selectedItem) {
          setScoreTypeFormValues(
            new ScoreTypeFormValues(scoreTypeStore.selectedItem)
          )
        }
      })
  }, [scoreTypeId, scoreTypeStore, props.scoreType])

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
        THÔNG TIN CỘT ĐIỂM
      </Typography>
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <EntityForm<ScoreTypeFormValues>
          initialEntityFormValues={scoreTypeFormValues}
          selectionFields={[]}
          validateObject={{
            name: Yup.string().required("Tên cột điểm không được để trống!"),
          }}
          fieldConfigs={[
            {
              fieldKey: "name",
              props: {
                label: "Tên cột điểm",
                placeholder: "Hãy nhập tên cột điểm tại đây!",
              },
            },
          ]}
          excludeFields={["classroomId"]}
          onSubmit={(entityFormValues) => {
            if (entityFormValues.id) {
              scoreTypeStore
                .update(entityFormValues.id, entityFormValues)
                .then(() => {
                  props.handleClose()
                })
            } else {
              scoreTypeStore.create(entityFormValues).then(() => {
                props.handleClose()
              })
            }
          }}
          onCancel={props.handleClose}
          onSetAdditionalValues={() => {}}
        />
      </Box>
    </Box>
  )
}

export default ScoreTypeForm
