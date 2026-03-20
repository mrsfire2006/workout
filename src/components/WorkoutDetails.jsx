import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutDetails = ({ workout }) => {
  const { editWorkout, dispatch } = useWorkoutContext();
  const{user} = useAuthContext();
  const handleCancel = () => {
    dispatch({ type: "CANCEL_EDIT_WORKOUT", payload: null });
  };
  const handleDelete = async () => {
    
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`,
        },
      },
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Delete Success" },
        severity: "error",
      });
    }
  };
  const handleEdit = () => {
    dispatch({ type: "SET_EDIT_WORKOUT", payload: workout });
  };

  return (
    <div
      className={
        editWorkout && editWorkout._id === workout._id
          ? "workout-details edited"
          : "workout-details"
      }
    >
      <div>
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps : </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <FontAwesomeIcon
          icon={faTrash}
          size="lg"
          className="span delete"
          onClick={handleDelete}
        />
        <FontAwesomeIcon
          icon={
            editWorkout && editWorkout._id === workout._id
              ? faXmark
              : faPenToSquare
          }
          size="lg"
          className="span edit"
          onClick={
            editWorkout && editWorkout._id === workout._id
              ? handleCancel
              : handleEdit
          }
        />
      </div>
    </div>
  );
};

export default WorkoutDetails;
