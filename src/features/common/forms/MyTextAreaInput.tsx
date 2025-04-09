import { Box, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useField } from 'formik';
import { v1 as uuidv1 } from 'uuid';
import { useRef, useState } from 'react';

const MyTextAreaInput = ({ label, icon, ...props }: any) => {
    const [field, meta, helpers] = useField(props);
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleEditorChange = (content: string) => {
        helpers.setValue(content); // Update the field value manually
    };

    return (
        <Box
            sx={{
                position: 'relative',
                mt: 3,
                mb: 2,
                width: '100%',
                maxWidth: '100ch',
                '@media (max-width: 400px)': {
                    width: '120ch',
                    maxWidth: '100%',
                },
                '@media (min-width: 1280px)': {
                    width: '100ch',
                    maxWidth: '100%',
                },
            }}
        >
            {label && (
                <Typography
                    component='label'
                    htmlFor={`${uuidv1()}-${props.name}-text-form`}
                    sx={{
                        fontSize: 12,
                        position: 'absolute',
                        left: '10px',
                        top: '-10px',
                        px: 1,
                        color: isFocused
                            ? '#1976d2'
                            : meta.touched && meta.error
                            ? '#4992da'
                            : 'text.secondary',
                        zIndex: 2,
                        backgroundColor: '#f5f5f5',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#f5f5f5',
                            zIndex: -1,
                        },
                    }}
                >
                    {label}
                </Typography>
            )}

            <Box
                ref={editorContainerRef}
                sx={{
                    position: 'relative',
                    '& .tox-tinymce': {
                        border: `1px solid ${
                            meta.touched && meta.error
                                ? '#1976d2'
                                : 'rgba(0, 0, 0, 0.23)'
                        }`,
                        borderRadius: '4px',
                    },
                }}
            >
                {icon && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            zIndex: 2,
                        }}
                    >
                        {icon}
                    </Box>
                )}

                <Editor
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    init={{
                        placeholder: props.placeholder,
                        toolbar: false,
                        statusbar: false,
                        plugins: [
                            'autoresize',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'charmap',
                            'searchreplace',
                            'insertdatetime',
                            'table',
                            'wordcount',
                        ],
                        menubar: false,
                        content_style: `
                          p {
                            margin: 0;
                          }
                          .mce-content-body {
                            background-color: #f5f5f5;
                            margin: ${icon ? '8px 8px 8px 36px' : '8px'};
                            min-height: 120px;
                          }
                          .mce-content-body p {
                            padding-left: 11px
                          }
                          .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
                            color: #9c9c9c;
                            padding-left: 11px
                          }
                        `,
                        setup: (editor) => {
                            editor.on('focus', () => {
                                setIsFocused(true);
                                if (editorContainerRef.current) {
                                    const editorElement =
                                        editorContainerRef.current.querySelector(
                                            '.tox-tinymce'
                                        );
                                    if (editorElement) {
                                        editorElement.classList.add('focused');
                                    }
                                }
                            });

                            editor.on('blur', () => {
                                setIsFocused(false);
                            });
                        },
                    }}
                    {...field}
                    {...props}
                    onEditorChange={handleEditorChange}
                    id={`${uuidv1()}-${props.name}-text-form`}
                />
            </Box>

            {meta.touched && meta.error && (
                <Typography
                    variant='body2'
                    color='#1976d2'
                    sx={{ mt: 1, ml: 2 }}
                >
                    {meta.error}
                </Typography>
            )}
        </Box>
    );
};

export default MyTextAreaInput;
