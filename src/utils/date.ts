import { DateType } from "../types/app.types";

export const getDates = (
  startDate: Date,
  endDate: Date,
  existingDates: DateType[]
) => {
  const dates = [];
  // :TODO If start date is changed, shift the whole schedule

  // Add to start date, add to end date

  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  let index = 0;

  while (currentDate <= endDate) {
    let existingDate = existingDates.filter((date) => date.id == index);
    let timeSlots = existingDate[0]?.timeSlots;

    let dateObj = {
      id: index,
      date: currentDate,
      timeSlots: timeSlots || [],
    };
    dates.push(dateObj);

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1 // Will increase month if over range
    );
    index++;
  }

  return dates;
};
