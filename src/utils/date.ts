import { DateType } from "../types/app.types";

export const getDates = (
  startDate: Date,
  endDate: Date,
  existingDates: DateType[]
) => {
  const dates = [];
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

export const formatDate = (date: string) => {
  const dateObject = new Date(date);
  const weekDate = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  return `${weekDate.toString().length < 2 ? "0" : ""}${weekDate}.${
    month.toString().length < 2 ? "0" : ""
  }${month}.${year}`;
};
