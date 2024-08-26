import { createContext, useContext, useReducer } from "react";
import { AppState } from "../types/app.types";
import { ActionTypes, reducer } from "./reducers/appReducer";

export const initialState: AppState = {
  startDate: "",
  endDate: "",
  dates: [],
  isSuccessUploadModalShown: false,
};

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTime = (dateId: number) => {
    dispatch({ type: ActionTypes.ADDTIME, payload: { dateId } });
  };

  const removeTimeSlotHandler = (dateId: number, timeSlotId: number) => {
    dispatch({
      type: ActionTypes.REMOVETIMESLOT,
      payload: { dateId, timeSlotId },
    });
  };

  const resetHandler = async () => {
    dispatch({ type: ActionTypes.RESETDATES });
  };

  const changeDateHandler = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    dispatch({ type: ActionTypes.CHANGEINPUTDATES, payload: { name, value } });
  };

  const resetState = () => {
    dispatch({ type: ActionTypes.TOGGLESUCCESSMODAL });
    dispatch({ type: ActionTypes.CLEARSTATE });
  };

  return (
    <AppContext.Provider
      value={
        {
          ...state,
          dispatch,
          actions: {
            resetHandler,
            changeDateHandler,
            removeTimeSlotHandler,
            addTime,
            resetState,
          },
        } as any
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
