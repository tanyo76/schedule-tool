import { AppState } from "../../types/app.types";
import { initialState } from "../AppContext";

export enum ActionTypes {
  ADDTIME = "ADDTIME",
  REMOTETIME = "REMOVETIME",
  CHANGEINPUTDATES = "CHANGEINPUTDATES",
  SETDATES = "SETDATES",
  RESETDATES = "RESETDATES",
  TOGGLESUCCESSMODAL = "TOGGLESUCCESSMODAL",
  REMOVETIMESLOT = "REMOVETIMESLOT",
  CLEARSTATE = "CLEARSTATE",

  // Pagination state
  SETWEEKDATES = "SETWEEKDATES",
  SETPAGINATIONNEXT = "SETPAGINATIONNEXT",
  SETPAGINATIONPREVIOUS = "SETPAGINATIONPREVIOUS",
}

interface Action {
  type: ActionTypes;
  payload?: any;
}

export const reducer = (state: AppState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.TOGGLESUCCESSMODAL:
      return {
        ...state,
        isSuccessUploadModalShown: !state.isSuccessUploadModalShown,
      };

    case ActionTypes.CHANGEINPUTDATES:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case ActionTypes.SETDATES:
      return {
        ...state,
        dates: payload,
      };
    case ActionTypes.RESETDATES:
      return {
        ...state,
        dates: state.dates.map((date) => ({ ...date, timeSlots: [] })),
      };

    case ActionTypes.REMOVETIMESLOT:
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

    case ActionTypes.ADDTIME:
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
    case ActionTypes.SETPAGINATIONNEXT:
      return {
        ...state,
        pagination: state.pagination + 1,
      };

    case ActionTypes.SETPAGINATIONPREVIOUS:
      return {
        ...state,
        pagination: state.pagination - 1,
      };

    case ActionTypes.SETWEEKDATES:
      return {
        ...state,
        weekDates: payload,
      };

    case ActionTypes.CLEARSTATE:
      return initialState;

    default:
      return state;
  }
};
