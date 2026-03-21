import { useReducer } from "react";
import { FormContext, formReducer } from "./formContext";

export const FormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, {
    workout: null,
    showModal: false,
  });

  return (
    <FormContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
