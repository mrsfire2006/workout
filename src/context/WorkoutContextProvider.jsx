import { useReducer } from "react";
import { WorkoutContext, workoutReducer } from "./WorkoutContext";

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
    editWorkout: null,
    notification: { open: false, message: "", severity: "success" }, 
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
