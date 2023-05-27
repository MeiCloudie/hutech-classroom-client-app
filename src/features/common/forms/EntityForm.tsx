import { useEffect, useState } from "react";
import Entity, { EntityFormValues } from "../../../app/common/models/Entity";
import EntityStore from "../../../app/common/stores/entityStore";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Stack } from "@mui/material";
import MyTextInput from "./MyTextInput";
import humanizeString from "humanize-string";
import MyCheckboxInput from "./MyCheckboxInput";
import MyPasswordInput from "./MyPasswordInput";
import MySelectionInput from "./MySelectionInput";
import MyTextAreaInput from "./MyTextAreaInput";

interface EntityFormProps<
  TEntity extends Entity,
  TEntityFormValues extends EntityFormValues
> {
  entityStore: EntityStore<TEntity, TEntityFormValues>;
  toFormValues: (entity?: TEntity) => TEntityFormValues;
  entityId?: string;
  selectionFields: {
    fieldKey: string;
    options: { label: string; value: any }[];
  }[];
  fieldConfigs: { fieldKey: string; props: FieldProps }[];
  excludeFields: string[];
  validateObject: {};
  onCreate?: (result?: TEntity) => void;
  onUpdate?: () => void;
  onCancel?: () => void;
  onSetAdditionalValues: (entityFormValues: TEntityFormValues) => void;
}

export interface FieldProps {
  placeholder: string;
  label: string;
  textarea?: boolean
}
const EntityForm = <
  TEntity extends Entity,
  TEntityFormValues extends EntityFormValues
>({
  entityStore,
  toFormValues,
  entityId,
  onCreate,
  onUpdate,
  onCancel,
  onSetAdditionalValues,
  selectionFields,
  fieldConfigs,
  excludeFields,
  validateObject,
}: EntityFormProps<TEntity, TEntityFormValues>) => {
  const {
    get,
    // loadingInitial,
    create,
    update,
  } = entityStore;

  const [entity, setEntity] = useState<TEntityFormValues>(toFormValues());

  const validationSchema = Yup.object(validateObject);

  useEffect(() => {
    if (entityId)
      get(entityId).then((entity) => {
        setEntity(toFormValues(entity));
      });
  }, [entityId, get, toFormValues]);

  const handleFormSubmit = (
    entityFormValues: TEntityFormValues,
    actions: FormikHelpers<TEntityFormValues>
  ) => {
    console.log(entityFormValues);
    onSetAdditionalValues(entityFormValues);
    if (!entity.id) {
      // entity.classroomId = classroomId;
      create(entityFormValues).then((result) => {
        console.log("Created");

        if (onCreate) onCreate(result);
      });
    } else {
      if (entityFormValues.id)
        update(entityFormValues.id, entityFormValues).then(() => {
          console.log("Updated");

          if (onUpdate) onUpdate();
        });
    }
    actions.setSubmitting(false);
  };

  const getInputComponent = ([key, value]: [string, any], index: number) => {
    const fieldConfig = fieldConfigs.find((field) => field.fieldKey === key);
    const label = fieldConfig?.props.label ?? humanizeString(key);
    const placeholder = fieldConfig?.props.placeholder ?? key;
    const isTextarea = fieldConfig?.props.textarea ?? false;
    if (excludeFields.includes(key)) return null;
    const enumField = selectionFields.find((field) => field.fieldKey === key);
    if (enumField)
      return (
        <MySelectionInput
          icon={null}
          name={enumField.fieldKey}
          options={enumField.options}
        />
      );
    if (key.toLowerCase().includes("password"))
      return (
        <MyPasswordInput
          name={key}
          label={label}
          key={index}
          placeholder={placeholder}
        />
      );
    if (!entityId && key.toLowerCase() === "id") return null;
    if (entityId && key.toLowerCase() === "id")
      return (
        <MyTextInput
          name={key}
          label={label}
          disabled
          key={index}
          placeholder={placeholder}
        />
      );
    if (typeof value === "string" && !isTextarea)
      return (
        <MyTextInput
          name={key}
          label={label}
          key={index}
          placeholder={placeholder}
        />
      );
      if (typeof value === "string" && isTextarea)
      return (
        <MyTextAreaInput
          name={key}
          label={label}
          key={index}
          placeholder={placeholder}
        />
      );
    if (typeof value === "number")
      return (
        <MyTextInput
          name={key}
          label={label}
          key={index}
          placeholder={placeholder}
          type="number"
        />
      );
    if (typeof value === "boolean")
      return (
        <MyCheckboxInput
          name={key}
          label={label}
          placeholder={placeholder}
          key={index}
        />
      );

    return null;
  };

  return (
    <Formik
      key="post-form"
      enableReinitialize
      initialValues={entity}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          component="form"
          noValidate
          autoComplete="true"
          onSubmit={handleSubmit}
        >
          {Object.entries(entity).map(getInputComponent)}

          <Stack sx={{ width: "100%" }} spacing={2}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Stack spacing={2} direction="row">
                <Button
                  onChange={onCancel}
                  variant="contained"
                  sx={{ m: "10px 0" }}
                >
                  "HUỶ"
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ m: "10px 0" }}
                >
                  {entityId ? "CẬP NHẬT" : "TẠO"}
                </Button>
              </Stack>
            </div>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default EntityForm;
