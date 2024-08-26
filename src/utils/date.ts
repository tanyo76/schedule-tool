// :TODO Persist times when changing the dates
export const getDates = (startDate: Date, endDate: Date) => {
  const dates = [];

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
      timeSlots: [],
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
