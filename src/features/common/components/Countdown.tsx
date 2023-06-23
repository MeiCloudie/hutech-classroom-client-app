import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";

interface CountdownProps {
  hidden?: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ hidden }) => {
  const [count, setCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputTime, setInputTime] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const storedCount = localStorage.getItem("count");
    const storedIsRunning = localStorage.getItem("isRunning");

    if (storedCount && storedIsRunning) {
      const parsedCount = parseInt(storedCount, 10);
      const parsedIsRunning = JSON.parse(storedIsRunning);
      setCount(parsedCount);
      setIsRunning(parsedIsRunning);
    } else {
      setCount(100);
    }
  }, [location]);

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout | null = null;

    if (isRunning) {
      countdownTimer = setInterval(() => {
        if (count > 0) {
          setCount((prevCount) => prevCount - 1);
          localStorage.setItem("count", String(count - 1));
        } else {
          clearInterval(countdownTimer as NodeJS.Timeout);
        }
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer as NodeJS.Timeout);
    };
  }, [count, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    localStorage.setItem("isRunning", "true");
  };

  const handleStop = () => {
    setIsRunning(false);
    localStorage.setItem("isRunning", "false");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(event.target.value);
  };

  const handleUpdateCountdown = () => {
    const parsedTime = parseInt(inputTime, 10);
    if (!isNaN(parsedTime)) {
      setCount(parsedTime);
      setInputTime("");
      localStorage.setItem("count", String(parsedTime));
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Countdown: {count}
      </Typography>
      <Box display="flex" alignItems="center" marginTop={2}>
        <TextField
          label="Set Countdown Time"
          variant="outlined"
          value={inputTime}
          onChange={handleInputChange}
          type="number"
          inputProps={{ min: "0" }}
        />
        <Button
          variant="contained"
          onClick={handleUpdateCountdown}
          color="primary"
          disabled={isRunning}
          style={{ marginLeft: "10px" }}
        >
          Set
        </Button>
      </Box>
      {isRunning ? (
        <Button
          variant="contained"
          onClick={handleStop}
          color="secondary"
          style={{ marginTop: "10px" }}
        >
          Stop
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleStart}
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Start
        </Button>
      )}
    </Box>
  );
};

export default Countdown;