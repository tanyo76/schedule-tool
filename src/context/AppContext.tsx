import { createContext, useContext, useReducer } from "react";
import { AppState } from "../types/app.types";

export enum ActionsTypes {
  ADDTIME = "ADDTIME",
  REMOTETIME = "REMOVETIME",
  CHANGEINPUTDATES = "CHANGEINPUTDATES",
  SETDATES = "SETDATES",
  RESETDATES = "RESETDATES",
  TOGGLESUCCESSMODAL = "TOGGLESUCCESSMODAL",
  REMOVETIMESLOT = "REMOVETIMESLOT",
  CLEARSTATE = "CLEARSTATE",
}

interface Action {
  type: ActionsTypes;
  payload?: any;
}

const initialState: AppState = {
  startDate: "",
  endDate: "",
  dates: [],
  isSuccessUploadModalShown: false,
};

export const AppContext = createContext(initialState);

const reducer = (state: AppState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionsTypes.TOGGLESUCCESSMODAL:
      return {
        ...state,
        isSuccessUploadModalShown: !state.isSuccessUploadModalShown,
      };

    case ActionsTypes.CHANGEINPUTDATES:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case ActionsTypes.SETDATES:
      return {
        ...state,
        dates: payload,
      };
    case ActionsTypes.RESETDATES:
      return {
        ...state,
        dates: state.dates.map((date) => ({ ...date, timeSlots: [] })),
      };

    case ActionsTypes.REMOVETIMESLOT:
      return {
        ...state,
        dates: state.dates.map((date) => {
          if (payload.dateId == date.id) {
            date.timeSlots = date.timeSlots.filter(
              (timeslot) => timeslot.id !== payload.timeSlotId
            );
          }
          return date;
        }),
      };

    case ActionsTypes.ADDTIME:
      return {
        ...state,
        dates: state.dates.map((date) => {
          if (date.id == payload.dateId) {
            return {
              ...date,
              timeSlots: [
                ...date.timeSlots,
                { id: date.timeSlots.length, time: "9:00" },
              ],
            };
          }

          return date;
        }),
      };
    case ActionsTypes.CLEARSTATE:
      return initialState;

    default:
      return state;
  }
};

export const AppContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch } as any}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
