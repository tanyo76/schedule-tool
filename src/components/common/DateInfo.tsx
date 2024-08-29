import { DateInfoProps } from "../../types/prop.types";

const DateInfo = ({ day, date }: DateInfoProps) => {
  const dateObject = new Date(date);
  const weekDate = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();

  const dateString = `${weekDate.toString().length < 2 ? "0" : ""}${weekDate}.${
    month.toString().length < 2 ? "0" : ""
  }${month}.${year}`.trim();
  return (
    <div className="date-info-container">
      <p className="bold">{day}</p>
      <p>{dateString}</p>
    </div>
  );
};

export default DateInfo;
