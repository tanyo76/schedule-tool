import { ScheduledDatesProps } from "../../types/prop.types";

const ScheduledDatesLength = ({ datesLength }: ScheduledDatesProps) => {
  return (
    <p className="scheduled-dates">
      {datesLength} {datesLength == 1 ? "day" : "days"}
    </p>
  );
};

export default ScheduledDatesLength;
