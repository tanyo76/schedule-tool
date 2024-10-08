export type TimeType = {
  id: number;
  time: string;
};

export type DateObject = {
  startDate: string;
  endDate: string;
  dates: DateType[];
};

export type DateType = {
  id: number;
  date: Date;
  timeSlots: TimeType[];
};

export type ModalsState = {
  isSuccessUploadModalShown: boolean;
};

export type PaginationState = {
  pagination: number;
  weekDates: DateType[];
};

export type AutocompleteState = {
  isAutocompleteAvailable: boolean;
};

export type AppState = DateObject &
  ModalsState &
  PaginationState &
  AutocompleteState;
