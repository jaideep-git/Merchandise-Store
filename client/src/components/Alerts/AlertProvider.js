import React, {createContext, useContext, useReducer} from "react";
import {v4} from "uuid";
import Alert from "./Alert";

const AlertContext = createContext();

const AlertProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_ALERT":
        return [...state, {...action.payload}];
      case "REMOVE_ALERT":
        return state.filter(el => el.id !== action.id);
      default:
        return state
    }
  }, []);

  return(
    <AlertContext.Provider value={dispatch}>
      <div className={"notification-wrapper"}>
        {state.map((note) => {
          return <Alert dispatch={dispatch} key={note.id} id={note.id} error={note.message} />
        })}
      </div>
      {props.children}
    </AlertContext.Provider>
  )
};

export const useAlert = () => {
  const dispatch = useContext(AlertContext);

  return (props) => {
    dispatch({
      type: "ADD_ALERT",
      payload: {
        id: v4(),
        ...props
      }
    })
  }
};

export default AlertProvider;