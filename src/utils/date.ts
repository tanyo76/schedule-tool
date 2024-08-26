import { DateType } from "../types/date.types";

// :TODO Populate the initial state from the json file
export const getDates = (
  startDate: Date,
  endDate: Date,
  allDates: DateType[]
) => {
  const dates = [];

  // Strip hours minutes seconds etc.
  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  let index = 0;

  while (currentDate <= endDate) {
    let dateObj = {
      id: index,
      date: currentDate,
      timeSlots: [{ id: 0, time: "9:00" }],
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
