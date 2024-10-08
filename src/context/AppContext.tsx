import { createContext, useContext, useReducer } from "react";
import { AppState, DateType } from "../types/app.types";
import { ActionTypes, reducer } from "./reducers/appReducer";
import { getDates } from "../utils/date";

export const initialState: AppState = {
  startDate: "",
  endDate: "",
  dates: [],
  isSuccessUploadModalShown: false,
  pagination: 0,
  weekDates: [],
  isAutocompleteAvailable: true,
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
    toggleAutocomplete(true);
  };

  const changeDateHandler = (date: Date, name: string) => {
    dispatch({
      type: ActionTypes.CHANGEINPUTDATES,
      payload: { name, value: date },
    });
  };

  const resetState = () => {
    dispatch({ type: ActionTypes.TOGGLESUCCESSMODAL });
    dispatch({ type: ActionTypes.CLEARSTATE });
  };

  const nextWeekHandler = (pages: number) => {
    dispatch({ type: ActionTypes.SETPAGINATIONNEXT });

    dispatch({
      type: ActionTypes.SETWEEKDATES,
      payload: state.dates.slice(pages * 7, 7),
    });
  };

  const previousWeekHandler = () => {
    dispatch({ type: ActionTypes.SETPAGINATIONPREVIOUS });
  };

  const setWeekDates = () => {
    const weekDates = state.dates.slice(
      state.pagination * 7,
      (state.pagination + 1) * 7
    );
    dispatch({ type: ActionTypes.SETWEEKDATES, payload: weekDates });
  };

  const setDates = (startDate: string, endDate: string) => {
    const datesResult = getDates(
      new Date(startDate),
      new Date(endDate),
      state.dates
    );

    state.pagination = 0;

    dispatch({ type: ActionTypes.SETDATES, payload: datesResult });
  };

  const setStartDateOnly = (startDateString: string, dates: DateType[]) => {
    const startDate = new Date(startDateString);

    if (dates.length) {
      let currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );

      let endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + dates.length - 1
      );

      setDates(currentDate.toString(), endDate.toString());
      changeDateHandler(endDate, "endDate");
    }
  };

  const toggleAutocomplete = (payload: boolean) => {
    dispatch({ type: ActionTypes.TOGGLEAUTOCOMPLETE, payload });
  };

  const autocomplete = () => {
    dispatch({ type: ActionTypes.AUTOCOMPLETE });
    toggleAutocomplete(false);
  };

  type ChangeTimeHandlerPayload = {
    dateId: number;
    timeslotId: number;
    value: string;
  };

  const changeTimeHandler = (payload: ChangeTimeHandlerPayload) => {
    dispatch({ type: ActionTypes.CHANGETIME, payload });
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
            nextWeekHandler,
            previousWeekHandler,
            setWeekDates,
            setDates,
            autocomplete,
            toggleAutocomplete,
            changeTimeHandler,
            setStartDateOnly,
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
