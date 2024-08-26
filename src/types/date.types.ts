export type TimeType = {
  id: number;
  time: string;
};

export type DateType = {
  id: number;
  date: Date;
  timeSlots: TimeType[];
};
