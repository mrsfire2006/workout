import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

import WorkoutDetails from "../components/WorkoutDetails";
import { useAuthContext } from "../hooks/useAuthContext";

const Workouts = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkout();
    } 
  }, [dispatch, user]);
  const data =
    workouts &&
    workouts.map((workout) => (
      <WorkoutDetails key={workout._id} workout={workout} />
    ));

  return <div className="workouts">{data}</div>;
};
export default Workouts;
