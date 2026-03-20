// pages and components
import Alert from "@mui/material/Alert";
import WorkoutForm from "../components/WorkoutForm";
import Workouts from "../components/Workouts";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import Snackbar from "@mui/material/Snackbar";

const Home = () => {
  const { notification, editWorkout, dispatch } = useWorkoutContext();
  return (
    <div className="home">
      <Workouts />
      <WorkoutForm key={editWorkout ? editWorkout._id : "empty"} />
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
