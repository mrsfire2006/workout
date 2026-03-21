// pages and components
import Alert from "@mui/material/Alert";
import WorkoutForm from "../components/WorkoutForm";
import Workouts from "../components/Workouts";
import Snackbar from "@mui/material/Snackbar";
import { useFormContext } from "../hooks/useFormContext";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
const Home = () => {
  const { workout, showModal, dispatch: formDispatch } = useFormContext();
  const { notification, dispatch } = useWorkoutContext();
  const handleClose = () => {
    formDispatch({ type: "DROP_MODAL" });
  };
  const handleOpen = () => {
    formDispatch({ type: "SHOW_MODAL_ADD" });
  };
  return (
    <div className="home">
      <button onClick={handleOpen}>+</button>
      <Workouts />

      <div className={`form-wrapper ${showModal ? "is-open" : ""}`}>
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        <WorkoutForm key={workout ? workout._id : "empty"} />
      </div>

      <Snackbar
        open={notification.open}
        autoHideDuration={500}
        onClose={() => {
          dispatch({ type: "HIDE_NOTIFICATION" });
        }}
      >
        <Alert
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
