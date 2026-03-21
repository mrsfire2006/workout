import { createContext } from "react";

export const FormContext = createContext();

export const formReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL_ADD":
      return {
        workout: null,
        showModal: true,
      };
    case "SHOW_MODAL_EDIT":
      return {
        workout: action.payload,
        showModal: true,
      };
    case "DROP_MODAL":
      return {
        workout: null,
        showModal: false,
      };
    default:
      return state;
  }
};
