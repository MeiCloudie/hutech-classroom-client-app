import { Box } from "@mui/material"
import * as Yup from "yup"
import { useEffect, useState } from "react"
import {
  ScoreTypeFormValues,
} from "../../../../app/models/ScoreType"
import { useStore } from "../../../../app/stores/store"
import BaseEntityForm from "../../../common/forms/BaseEntityForm"

interface ScoreTypeFormProps {
  handleClose: () => void
  scoreTypeId?: number
}

const ScoreTypeForm = (props: ScoreTypeFormProps) => {
  const { scoreTypeStore } = useStore()
  const [scoreTypeFormValues, setScoreTypeFormValues] =
    useState<ScoreTypeFormValues>(new ScoreTypeFormValues())

  useEffect(() => {
    if (props.scoreTypeId) {
      scoreTypeStore.get(props.scoreTypeId).then(() => {
        setScoreTypeFormValues(
          new ScoreTypeFormValues(scoreTypeStore.selectedItem)
        )
      })
    } else if (props.scoreTypeId)
      scoreTypeStore.get(props.scoreTypeId).then(() => {
        if (scoreTypeStore.selectedItem) {
          setScoreTypeFormValues(
            new ScoreTypeFormValues(scoreTypeStore.selectedItem)
          )
        }
      })
  }, [props.scoreTypeId, scoreTypeStore])

  return (
    <Box sx={{ width: "100%" }}>
      <BaseEntityForm<number, ScoreTypeFormValues>
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
        excludeFields={["id"]}
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
  )
}

export default ScoreTypeForm
