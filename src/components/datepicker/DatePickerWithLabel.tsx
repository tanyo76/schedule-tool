import DatePicker from "react-datepicker";
import { DatePickerProps } from "../../types/prop.types";

const DatePickerWithLabel = ({
  labelText,
  handler,
  selectedValue,
  name,
}: DatePickerProps) => {
  return (
    <div className="datepicker-container">
      <label>{labelText}</label>
      <DatePicker
        dateFormat="dd.MM.yyyy"
        onChange={(date) => handler(date, name)}
        selected={selectedValue}
        className="date-picker"
      />
    </div>
  );
};

export default DatePickerWithLabel;
