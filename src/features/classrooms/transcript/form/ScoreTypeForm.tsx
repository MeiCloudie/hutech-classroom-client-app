import { Box } from "@mui/material"
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
    <Box sx={{ width: "100%" }}>
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
        excludeFields={[""]}
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
