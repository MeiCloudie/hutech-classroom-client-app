import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import TargetForm from "../forms/TargetForm";
import { toast } from "react-toastify";

const CountdownDatetime = () => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>();

  return (
    <Box>
      <TargetForm
        onSubmit={(targetFormValues, actions) => {
          clearInterval(intervalRef.current);
          const target = new Date(targetFormValues.toDate().toUTCString());

          const interval = setInterval(() => {
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

          toast.success("Đã cập nhật thành công!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          actions.setSubmitting(false);
        }}
      />
      {partyTime ? (
        <Typography variant="h2">Đã hết giờ!</Typography>
      ) : (
        <Box>
          <Typography variant="h2">
            {days} : {hours} : {minutes} : {seconds}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CountdownDatetime;
