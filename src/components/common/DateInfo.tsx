import { DateInfoProps } from "../../types/prop.types";
import { formatDate } from "../../utils/date";

const DateInfo = ({ day, date }: DateInfoProps) => {
  const dateString = formatDate(date);
  return (
    <div className="date-info-container">
      <p className="bold">{day}</p>
      <p>{dateString}</p>
    </div>
  );
};

export default DateInfo;
