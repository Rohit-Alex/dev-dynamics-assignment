import Paper from "@mui/material/Paper";

const NotDataCard = () => {
  return (
    <Paper
      square={false}
      elevation={3}
      sx={{
        mt: 8,
        p: 4,
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      No data found
    </Paper>
  );
};

export default NotDataCard;
