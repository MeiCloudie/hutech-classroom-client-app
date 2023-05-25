import { ReactElement, useEffect, useState } from "react";
import Entity, { EntityFormValues } from "../../../app/common/models/Entity"
import EntityStore from "../../../app/common/stores/entityStore";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Stack } from "@mui/material";
import MyTextInput from "./MyTextInput";
import humanizeString from 'humanize-string';
import MyCheckboxInput from "./MyCheckboxInput";
import MyPasswordInput from "./MyPasswordInput";
import MySelectionInput, { MySelectionFormProps } from "./MySelectionInput";
import { JsxElement } from "typescript";

interface EntityFormProps<TEntity extends Entity, TEntityFormValues extends EntityFormValues> {
    entityStore: EntityStore<TEntity, TEntityFormValues>,
    toFormValues: (entity?: TEntity) => TEntityFormValues,
    entityId?: string,
    modifyFields: { fieldKey: string, options: { label: string; value: any }[] }[]
    onCreate?: () => void,
    onUpdate?: () => void,
    onSetAdditionalValues: (entityFormValues: TEntityFormValues) => void
}

const EntityForm = <TEntity extends Entity, TEntityFormValues extends EntityFormValues>(
    { entityStore, toFormValues, entityId, onCreate, onUpdate, onSetAdditionalValues, modifyFields }: EntityFormProps<TEntity, TEntityFormValues>
) => {

    const {
        get,
        // loadingInitial,
        create,
        update,
    } = entityStore;


    const [entity, setEntity] = useState<TEntityFormValues>(toFormValues());

    const validationSchema = Yup.object({

    });

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
        let returnField: JSX.Element | undefined = undefined;
        modifyFields.forEach(({ fieldKey, options }, index) => {
            if (key === fieldKey) {
                returnField = <MySelectionInput icon={null} name={fieldKey} options={options} />
            }
        })
        if (returnField) return returnField
        if (key.toLowerCase().includes("password"))
            return <MyPasswordInput
                name={key}
                label={humanizeString(key)}
                key={index}
            />
        if (key.toLowerCase() === "id")
            return <MyTextInput
                name={key}
                label={humanizeString(key)}
                disabled
                key={index}
            />
        if (key.toLowerCase().includes("id"))
            return null

        if (typeof value === "object" && value instanceof Object && Object.values(value).every((v) => typeof v === "string" || typeof v === "number")) {
            const selectionProps: MySelectionFormProps = {
                name: key,
                label: humanizeString(key),
                icon: null,
                options: Object.values(value).map((val: any) => ({ label: humanizeString(val), value: val })),
            };
            return (
                <MySelectionInput
                    {...selectionProps}
                    key={index}
                />
            );
        }
        if (typeof value === "string")
            return <MyTextInput
                name={key}
                label={humanizeString(key)}
                key={index}
            />
        if (typeof value === "number")
            return <MyTextInput
                name={key}
                label={humanizeString(key)}
                key={index}
                type='number'
            />
        if (typeof value === "boolean")
            return <MyCheckboxInput
                name={key}
                label={humanizeString(key)}
                placeholder={humanizeString(key)}
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