import { EntityFormValues } from '../../../app/common/models/Entity';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { Box, Button, Stack } from '@mui/material';
import MyTextInput from './MyTextInput';
import humanizeString from 'humanize-string';
import MyCheckboxInput from './MyCheckboxInput';
import MyPasswordInput from './MyPasswordInput';
import MySelectionInput from './MySelectionInput';
import MyTextAreaInput from './MyTextAreaInput';
import MyDateInput from './MyDateInput';
import { InputType } from '../../../app/layout/enums/InputTypes';

interface EntityFormProps<TEntityFormValues extends EntityFormValues> {
    initialEntityFormValues: TEntityFormValues;
    selectionFields: {
        fieldKey: string;
        options: { label: string; value: any }[];
    }[];
    fieldConfigs: { fieldKey: string; props: FieldProps }[];
    excludeFields: string[];
    validateObject: {};
    onSubmit: (entityFormValues: TEntityFormValues) => void;
    onCancel?: () => void;
    onSetAdditionalValues: (entityFormValues: TEntityFormValues) => void;
}

export interface FieldProps {
    placeholder: string;
    label: string;
    type?: InputType;
    rows?: number;
}
const EntityForm = <TEntityFormValues extends EntityFormValues>({
    initialEntityFormValues,
    onSubmit,
    onCancel,
    onSetAdditionalValues,
    selectionFields,
    fieldConfigs,
    excludeFields,
    validateObject,
}: EntityFormProps<TEntityFormValues>) => {
    const validationSchema = Yup.object(validateObject);
    const handleFormSubmit = (
        entityFormValues: TEntityFormValues,
        actions: FormikHelpers<TEntityFormValues>
    ) => {
        onSetAdditionalValues(entityFormValues);
        onSubmit(entityFormValues);
        if (!initialEntityFormValues.id) actions.resetForm();
        actions.setSubmitting(false);
    };

    const getInputComponent = ([key, value]: [string, any], index: number) => {
        excludeFields.push('id');
        excludeFields.push('createDate');
        excludeFields.push('updateDate');
        const fieldConfig = fieldConfigs.find(
            (field) => field.fieldKey === key
        );
        const label = fieldConfig?.props.label ?? humanizeString(key);
        const placeholder = fieldConfig?.props.placeholder ?? key;
        const isTextarea = fieldConfig?.props.type === InputType.Textarea;
        const isDate = fieldConfig?.props.type === InputType.Date;
        if (excludeFields.includes(key)) return null;
        const selectionField = selectionFields.find(
            (field) => field.fieldKey === key
        );
        if (selectionField)
            return (
                <MySelectionInput
                    key={index}
                    icon={null}
                    label={label}
                    name={selectionField.fieldKey}
                    options={selectionField.options}
                />
            );
        if (key.toLowerCase().includes('password'))
            return (
                <MyPasswordInput
                    name={key}
                    label={label}
                    key={index}
                    placeholder={placeholder}
                />
            );
        if (!initialEntityFormValues.id && key.toLowerCase() === 'id')
            return null;
        if (initialEntityFormValues.id && key.toLowerCase() === 'id')
            return (
                <MyTextInput
                    name={key}
                    label={label}
                    disabled
                    key={index}
                    placeholder={placeholder}
                />
            );
        if (isDate || value instanceof Date) {
            return (
                <MyDateInput
                    name={key}
                    label={label}
                    key={index}
                    placeholder={placeholder}
                />
            );
        }
        if (typeof value === 'string' && !isTextarea) {
            const rows = fieldConfig?.props.rows ?? 1;
            const isMultiline = rows > 1;
            return (
                <MyTextInput
                    name={key}
                    label={label}
                    key={index}
                    rows={rows}
                    multiline={isMultiline}
                    placeholder={placeholder}
                />
            );
        }
        if (typeof value === 'string' && isTextarea)
            return (
                <MyTextAreaInput
                    name={key}
                    label={label}
                    key={index}
                    placeholder={placeholder}
                />
            );

        if (typeof value === 'number')
            return (
                <MyTextInput
                    name={key}
                    label={label}
                    key={index}
                    placeholder={placeholder}
                    type='number'
                />
            );
        if (typeof value === 'boolean')
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
            key='formik-form'
            enableReinitialize
            initialValues={initialEntityFormValues}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Box
                    component='form'
                    noValidate
                    autoComplete='true'
                    onSubmit={handleSubmit}
                >
                    {Object.entries(initialEntityFormValues).map(
                        getInputComponent
                    )}

                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}
                            sx={{ mt: 3 }}
                        >
                            <Stack
                                direction='row'
                                spacing={2}
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-end',
                                    mt: 1,
                                }}
                            >
                                <Button
                                    onClick={onCancel}
                                    variant='contained'
                                    fullWidth
                                    sx={{ maxWidth: 60 }}
                                >
                                    HUỶ
                                </Button>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    disabled={isSubmitting}
                                    fullWidth
                                    sx={{
                                        maxWidth: initialEntityFormValues.id
                                            ? 120
                                            : 60,
                                        maxHeight: 34,
                                    }}
                                >
                                    {initialEntityFormValues.id
                                        ? 'CẬP NHẬT'
                                        : 'TẠO'}
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            )}
        </Formik>
    );
};

export default EntityForm;
