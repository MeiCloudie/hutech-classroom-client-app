import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import TargetForm from '../forms/TargetForm';
import { toast } from 'react-toastify';

const CountdownDatetime = () => {
    const [partyTime, setPartyTime] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        const targetDate = localStorage.getItem('target');
        if (!targetDate) {
            return;
        }
        clearInterval(intervalRef.current);
        const target = new Date(targetDate);
        localStorage.setItem('target', targetDate);

        const interval = setInterval(() => {
            setPartyTime(false);

            const now = new Date();
            const difference = target.getTime() - now.getTime();

            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            setDays(d);

            const h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            setHours(h);

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMinutes(m);

            const s = Math.floor((difference % (1000 * 60)) / 1000);
            setSeconds(s);

            if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
                setPartyTime(true);
            }
        }, 1000);
        intervalRef.current = interval;
    }, []);

    return (
        <Box>
            <Typography variant='h6' mt={2} fontWeight={'bold'}>
                - BỘ HẸN GIỜ -
            </Typography>

            <TargetForm
                onSubmit={(targetFormValues, actions) => {
                    clearInterval(intervalRef.current);
                    const target = new Date(
                        targetFormValues.toDate().toString()
                    );
                    localStorage.setItem(
                        'target',
                        targetFormValues.toDate().toString()
                    );

                    const interval = setInterval(() => {
                        setPartyTime(false);

                        const now = new Date();
                        const difference = target.getTime() - now.getTime();

                        const d = Math.floor(
                            difference / (1000 * 60 * 60 * 24)
                        );
                        setDays(d);

                        const h = Math.floor(
                            (difference % (1000 * 60 * 60 * 24)) /
                                (1000 * 60 * 60)
                        );
                        setHours(h);

                        const m = Math.floor(
                            (difference % (1000 * 60 * 60)) / (1000 * 60)
                        );
                        setMinutes(m);

                        const s = Math.floor((difference % (1000 * 60)) / 1000);
                        setSeconds(s);

                        if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
                            setPartyTime(true);
                        }
                    }, 1000);
                    intervalRef.current = interval;

                    toast.success('Đã cập nhật thành công!', {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });

                    actions.setSubmitting(false);
                }}
            />

            {partyTime ? (
                <Typography variant='h4' mt={2} fontWeight={'bold'}>
                    Đã hết giờ!
                </Typography>
            ) : (
                <Box>
                    <Typography variant='h4' mt={2}>
                        Thời gian còn lại: {days} ngày : {hours} giờ : {minutes}{' '}
                        phút : {seconds} giây
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default CountdownDatetime;
