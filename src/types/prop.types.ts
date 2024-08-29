import { DateType } from "./app.types";

export type DatesContainerProps = {
  dates: DateType[];
  deleteHandler: Function;
  addTimeHandler: Function;
};

export type ActionButtonType = {
  text: string;
  color?: string;
  onClickHandler: Function;
  disabled?: boolean;
};

export type DatePickerProps = {
  labelText: string;
  handler: Function;
  selectedValue: Date;
  name: string;
};

export type ScheduledDatesProps = {
  datesLength: number;
};

export type DateInfoProps = {
  day: string;
  dayOfTheWeek: string;
};
