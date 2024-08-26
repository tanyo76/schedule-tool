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
