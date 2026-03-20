import { createContext } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload };
    case "CREATE_WORKOUT":
      return { ...state, workouts: [action.payload, ...state.workouts] };
    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    case "SET_EDIT_WORKOUT":
      return {
        ...state,
        editWorkout: action.payload,
      };
    case "CANCEL_EDIT_WORKOUT":
      return {
        ...state,
        editWorkout: action.payload,
      };
    case "EDIT_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          if (workout._id == action.payload._id) {
            return {
              ...workout,
              title: action.payload.title,
              reps: action.payload.reps,
              load: action.payload.load,
            };
          }
          return workout;
        }),
      };
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        notification: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity || "success",
        },
      };

    case "HIDE_NOTIFICATION":
      return {
        ...state,
        notification: { ...state.notification, open: false },
      };

    default:
      return state;
  }
};
