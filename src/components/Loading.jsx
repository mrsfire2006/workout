import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = ({ isloading }) => {
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
export default Loading;
