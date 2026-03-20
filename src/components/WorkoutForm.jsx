import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { editWorkout, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [workout, setWorkout] = useState({
    id: editWorkout ? editWorkout._id : "",
    title: editWorkout ? editWorkout.title : "",
    reps: editWorkout ? editWorkout.reps : 0,
    load: editWorkout ? editWorkout.load : 0,
  });
  const [error, setError] = useState(null);
  const handleEdit = async () => {
    const newWorkout = { ...workout };
    if (!user) {
      setError("must be login");
      return;
    }
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/workouts/${workout.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(newWorkout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "EDIT_WORKOUT", payload: json });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Edit Success" },
      });
    } else {
      setError(json);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("must be login");
      return;
    }
    const newWorkout = { ...workout };
    const res = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
      method: "POST",
      body: JSON.stringify(newWorkout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json);
    }
    if (res.ok) {
      setWorkout({ title: "", reps: 0, load: 0 });
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Create Success" },
      });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label>Exercise Title: </label>
      <input
        type="text"
        value={workout.title}
        className={error && error.title !== "" ? "error" : ""}
        onChange={(e) => {
          if (e.target.value !== "") {
            setError(null);
          }
          setWorkout((prev) => {
            return { ...prev, title: e.target.value };
          });
        }}
      />
      <label>Load (in Kg): </label>
      <input
        type="number"
        value={workout.load}
        className={error && error.load !== "" ? "error" : ""}
        onChange={(e) => {
          if (e.target.value !== "") {
            setError(null);
          }
          setWorkout((prev) => {
            return { ...prev, load: e.target.value };
          });
        }}
      />
      <label>Reps: </label>
      <input
        type="number"
        value={workout.reps}
        className={error && error.reps !== "" ? "error" : ""}
        onChange={(e) => {
          if (e.target.value !== "") {
            setError(null);
          }
          setWorkout((prev) => {
            return { ...prev, reps: e.target.value };
          });
        }}
      />
      <div className="actions">
        <button
          disabled={editWorkout ? true : false}
          style={{ opacity: editWorkout ? "0.8" : "1" }}
        >
          Add Workout
        </button>

        <button
          disabled={editWorkout ? false : true}
          style={{ opacity: editWorkout ? "1" : "0" }}
          type="button"
          onClick={handleEdit}
        >
          Save
        </button>
      </div>
      {error && (
        <div className="error">
          {error.title || error.reps || error.load || error.message}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
