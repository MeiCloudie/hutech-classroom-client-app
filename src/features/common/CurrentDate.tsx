import Typography from "@mui/material/Typography";

const CurrentDate = () => {
  const nowDate = new Date();
  const day = nowDate.getDate().toString().padStart(2, "0");
  const month = (nowDate.getMonth() + 1).toString().padStart(2, "0");
  const year = nowDate.getFullYear().toString();
  const hours = nowDate.getHours().toString().padStart(2, "0");
  const minutes = nowDate.getMinutes().toString().padStart(2, "0");
  const seconds = nowDate.getSeconds().toString().padStart(2, "0");
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return (
    <Typography variant="subtitle1" gutterBottom>
      {formattedDate}
    </Typography>
  );
};

export default CurrentDate;
