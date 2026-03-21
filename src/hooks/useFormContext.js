import { useContext } from "react";
import { FormContext } from "../context/formContext";

export const useFormContext = () => {
  const context = useContext(FormContext);

  return context;
};
