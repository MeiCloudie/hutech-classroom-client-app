import { useEffect, useState } from "react";
import Entity, { EntityFormValues } from "../../../app/common/models/Entity"
import EntityStore from "../../../app/common/stores/entityStore";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Stack } from "@mui/material";
import MyTextInput from "./MyTextInput";
import humanizeString from 'humanize-string';
import MyCheckboxInput from "./MyCheckboxInput";
import MyPasswordInput from "./MyPasswordInput";
import MySelectionInput from "./MySelectionInput";

interface EntityFormProps<TEntity extends Entity, TEntityFormValues extends EntityFormValues> {
    entityStore: EntityStore<TEntity, TEntityFormValues>,
    toFormValues: (entity?: TEntity) => TEntityFormValues,
    entityId?: string,
    enumFields: { fieldKey: string, options: { label: string; value: any }[] }[],
    fieldConfigs: { fieldKey: string, props: FieldProps }[]
    excludeFields: string[],
    validateObject: {},
    onCreate?: () => void,
    onUpdate?: () => void,
    onSetAdditionalValues: (entityFormValues: TEntityFormValues) => void
}

export interface FieldProps {
    placeholder: string,
    label: string,
}
const EntityForm = <TEntity extends Entity, TEntityFormValues extends EntityFormValues>(
    { entityStore, toFormValues, entityId, onCreate, onUpdate, onSetAdditionalValues, enumFields, fieldConfigs, excludeFields, validateObject }: EntityFormProps<TEntity, TEntityFormValues>
) => {

    const {
        get,
        // loadingInitial,
        create,
        update,
    } = entityStore;


    const [entity, setEntity] = useState<TEntityFormValues>(toFormValues());

    const validationSchema = Yup.object(validateObject);

    useEffect(() => {
        if (entityId) get(entityId).then((entity) => {
            setEntity(toFormValues(entity));
        });
    }, [entityId, get, toFormValues]);

    const handleFormSubmit = (entityFormValues: TEntityFormValues, actions: FormikHelpers<TEntityFormValues>) => {
        console.log(entityFormValues)
        if (!entity.id) {
            onSetAdditionalValues(entityFormValues)
            // entity.classroomId = classroomId;
            create(entityFormValues).then(() => {
                console.log("Created")

                if (onCreate) onCreate()
            });
        } else {
            if (entityFormValues.id)
                update(entityFormValues.id, entityFormValues).then(() => {
                    console.log("Updated")

                    if (onUpdate) onUpdate()
                });
        }
        actions.setSubmitting(false)
    };

    const getInputComponent = ([key, value]: [string, any], index: number) => {
        const fieldConfig = fieldConfigs.find(field => field.fieldKey === key);
        const label = fieldConfig?.props.label ?? humanizeString(key);
        const placeholder = fieldConfig?.props.placeholder ?? key;
        if (excludeFields.includes(key))
            return null;
        const enumField = enumFields.find((field) => field.fieldKey === key);
        if (enumField)
            return <MySelectionInput
                icon={null}
                name={enumField.fieldKey}
                options={enumField.options}
            />
        if (key.toLowerCase().includes("password"))
            return <MyPasswordInput
                name={key}
                label={label}
                key={index}
                placeholder={placeholder}
            />
        if (key.toLowerCase() === "id")
            return <MyTextInput
                name={key}
                label={label}
                disabled
                key={index}
                placeholder={placeholder}
            />
        if (key.toLowerCase().includes("id"))
            return null
        if (typeof value === "string")
            return <MyTextInput
                name={key}
                label={label}
                key={index}
                placeholder={placeholder}
            />
        if (typeof value === "number")
            return <MyTextInput
                name={key}
                label={label}
                key={index}
                placeholder={placeholder}
                type='number'
            />
        if (typeof value === "boolean")
            return <MyCheckboxInput
                name={key}
                label={label}
                placeholder={placeholder}
                key={index}
            />

        return null
    }

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
    )
}

export default EntityForm;