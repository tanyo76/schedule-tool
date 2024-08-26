import { useEffect, useState } from "react";

import ActionButton from "../../components/buttons/ActionButton";
import ActionButtonsContainer from "../../components/containers/ActionButtonsContainer";
import DatesContainer from "../../components/containers/DatesContainer";
import { getDates } from "../../utils/date";
import * as datesData from "../../data/dates.json";
import { DateType } from "../../types/date.types";

const SchedulePage = () => {
  // First check json dates
  let datesInputJson = JSON.parse(JSON.stringify(datesData));
  let datesJson = datesInputJson?.dates?.map((dateObject: DateType) => ({
    ...dateObject,
    date: new Date(dateObject.date),
  }));

  //   Input Dates
  const [dates, setDates] = useState({
    startDate: datesInputJson?.startDate ? datesInputJson?.startDate : "",
    endDate: datesInputJson?.endDate ? datesInputJson?.endDate : "",
  });

  //   All dates range
  const [allDates, setAllDates] = useState<DateType[]>(datesJson);

  const changeDateHandler = (e: any) => {
    const dateString = e.target.value;
    const name = e.target.name;
    setDates((prevState) => ({ ...prevState, [name]: dateString }));
  };

  const calculateDates = (e: any) => {
    changeDateHandler(e);
  };

  useEffect(() => {
    // :TODO Change logic to only add a column
    if (
      dates.startDate !== datesInputJson?.startDate ||
      dates.endDate !== datesInputJson?.endDate
    ) {
      console.log("test");
      const datesResult = getDates(
        new Date(dates.startDate),
        new Date(dates.endDate),
        allDates
      );

      setAllDates(datesResult);
    }
  }, [dates]);

  const uploadHandler = async () => {
    const uploadObject = {
      startDate: dates.startDate,
      endDate: dates.endDate,
      dates: allDates,
    };

    const jsonObject = JSON.stringify(uploadObject);
    console.log(jsonObject);
    // :TODO Write to the dates.json file
  };

  const resetHandler = async () => {
    setAllDates((prevState) =>
      prevState.map((date) => ({ ...date, timeSlots: [] }))
    );
  };

  const removeTimeSlotHandler = (dateId: number, timeSlotId: number) => {
    console.log(dateId, timeSlotId);
    setAllDates((prevState) =>
      prevState.map((date) => {
        if (dateId == date.id) {
          date.timeSlots = date.timeSlots.filter(
            (timeslot) => timeslot.id !== timeSlotId
          );
        }
        return date;
      })
    );
  };

  const addTime = (dateId: number) => {
    setAllDates((prevState) =>
      prevState.map((date) => {
        if (date.id == dateId) {
          return {
            ...date,
            timeSlots: [
              ...date.timeSlots,
              { id: date.timeSlots.length, time: "9:00" },
            ],
          };
        }

        return date;
      })
    );
  };

  let isResetButtonDisabled = allDates.some((date) => date.timeSlots.length);

  let isUploadButtonDisabled = allDates.every(
    (date) => date.timeSlots.length >= 1
  );

  //   :TODO Disable autocomplete button
  let isAutocompleteDisabled = isResetButtonDisabled;

  return (
    <div className="container">
      <h1>Create new Schedule</h1>
      <input
        type="date"
        onChange={changeDateHandler}
        name="startDate"
        value={dates.startDate}
      />
      <input
        type="date"
        onChange={calculateDates}
        name="endDate"
        value={dates.endDate}
      />

      {allDates?.length > 0 && <p>{allDates.length} days</p>}
      <hr />

      <DatesContainer
        dates={allDates}
        deleteHandler={removeTimeSlotHandler}
        addTimeHandler={addTime}
      ></DatesContainer>

      <ActionButtonsContainer>
        {/* Disabled if there are no timeslots */}
        <ActionButton
          text="Reset"
          onClickHandler={resetHandler}
          disabled={!isResetButtonDisabled}
        />

        {/* Disabled if there are no timeslots */}
        <ActionButton
          text="Autocomplete"
          color="#E11BB6"
          onClickHandler={uploadHandler}
          disabled={!isAutocompleteDisabled}
        />
        <ActionButton
          text="Upload"
          onClickHandler={uploadHandler}
          disabled={!isUploadButtonDisabled}
        />
      </ActionButtonsContainer>
    </div>
  );
};

export default SchedulePage;
