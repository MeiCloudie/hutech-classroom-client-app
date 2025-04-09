import React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

export default function RequireAuth() {
    const {
        userStore: { isLoggedIn, user, isStudent },
    } = useStore();
    const location = useLocation();

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (isLoggedIn && isStudent) {
            setOpen(false);
        }
    }, [isLoggedIn, isStudent]);

    if (!isLoggedIn) {
        return <Navigate to='/' state={{ from: location }} />;
    }

    return (
        <>
            <Outlet />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-reminder'
                aria-describedby='alert-dialog-remind-update-email'
            >
                <DialogTitle id='alert-dialog-reminder'>
                    {'NHẮC NHỞ'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-remind-update-email'>
                        {`Bạn còn sử dụng email "${user?.email}" không? Nếu không hãy cập nhật lại email mới!`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'gray' }}>
                        ĐỂ SAU
                    </Button>
                    <Button
                        onClick={handleClose}
                        autoFocus
                        component={Link}
                        to={`/settings`}
                    >
                        THỰC HIỆN NGAY
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
