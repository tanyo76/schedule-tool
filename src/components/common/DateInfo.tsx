import { DateInfoProps } from "../../types/prop.types";

const DateInfo = ({ day, dayOfTheWeek }: DateInfoProps) => {
  return (
    <div className="date-info-container">
      <p className="bold">{day}</p>
      <p>{dayOfTheWeek}</p>
    </div>
  );
};

export default DateInfo;
