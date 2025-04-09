import React, { useState, useRef, ChangeEvent } from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useStore } from '../../../app/stores/store';
import { yellow } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { toastBasic } from '../../../app/common/configs';
import { observer } from 'mobx-react-lite';

interface CropperElement extends HTMLImageElement {
    cropper: any;
}

const UpdateAvatarTab: React.FC = () => {
    const { userStore } = useStore();

    const [file, setFile] = useState<File | null>(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);

    const cropperRef = useRef<CropperElement | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setCroppedImageUrl(null);
        }
    };

    const handleFileUpdate = async () => {
        if (!croppedImageBlob) return;
        const response = await userStore.addAvatar(croppedImageBlob);
        await userStore.getUser();

        if (response) {
            toast.success(
                'Bạn đã cập nhật thành công, hãy đợi một lát để ảnh được thay đổi nhé!',
                toastBasic
            );
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const croppedImageDataUrl = cropperRef
                .current!.cropper.getCroppedCanvas()
                .toDataURL();
            cropperRef
                .current!.cropper.getCroppedCanvas()
                .toBlob(async (blob: Blob | null) => {
                    if (blob) {
                        setCroppedImageBlob(blob);
                    }
                });
            setCroppedImageUrl(croppedImageDataUrl);
        }
    };

    return (
        <Container maxWidth='lg'>
            <Typography
                variant='h5'
                gutterBottom
                sx={{
                    fontWeight: 600,
                    color: (theme) => theme.palette.primary.main,
                    textAlign: 'start',
                    marginBottom: 2,
                }}
            >
                Thay đổi ảnh đại diện:
            </Typography>
            <Grid
                container
                spacing={4}
                columns={{ xs: 1, md: 12 }}
                justifyContent={'center'}
            >
                <Grid size={{ md: 6, xs: 1 }}>
                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent={'center'}
                    >
                        <Avatar
                            alt='anh-dai-dien'
                            src={userStore.user?.avatarUrl}
                            sx={{
                                width: 200,
                                height: 200,
                                bgcolor: yellow[800],
                            }}
                            variant='rounded'
                        />
                    </Stack>
                </Grid>
                <Grid size={{ md: 6, xs: 1 }}>
                    <Box>
                        <input
                            accept='image/*'
                            style={{ display: 'none' }}
                            id='avatar-upload'
                            type='file'
                            onChange={handleFileChange}
                        />
                        <label htmlFor='avatar-upload'>
                            <Button
                                variant='contained'
                                component='span'
                                sx={{ mb: 1 }}
                            >
                                CHỌN TỆP ẢNH
                            </Button>
                        </label>
                        {file && (
                            <div>
                                <Typography variant='subtitle1'>
                                    Tệp đã chọn: {file.name}
                                </Typography>
                                <Cropper
                                    ref={cropperRef}
                                    src={URL.createObjectURL(file)}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                        marginTop: '8px',
                                    }}
                                />
                                <Button
                                    variant='contained'
                                    onClick={handleCrop}
                                    sx={{ my: 1 }}
                                >
                                    Cắt Ảnh
                                </Button>
                            </div>
                        )}
                        {croppedImageUrl && (
                            <div>
                                <Typography variant='subtitle1'>
                                    - Ảnh đã cắt -
                                </Typography>
                                <img
                                    src={croppedImageUrl}
                                    alt=''
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                        marginTop: '8px',
                                    }}
                                />
                                <Divider sx={{ my: 1 }} />
                                <Button
                                    variant='contained'
                                    onClick={handleFileUpdate}
                                >
                                    CẬP NHẬT ẢNH
                                </Button>
                            </div>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default observer(UpdateAvatarTab);
