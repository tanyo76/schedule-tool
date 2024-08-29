import { useEffect } from "react";

import ActionButton from "../../components/buttons/ActionButton";
import ActionButtonsContainer from "../../components/containers/ActionButtonsContainer";
import DatesContainer from "../../components/containers/DatesContainer";
import { downloadFile } from "../../utils/download";
import SuccessfulUploadModal from "../../components/modals/SuccessfulUploadModal";
import { useAppContext } from "../../context/AppContext";
import { ActionTypes } from "../../context/reducers/appReducer";
import DatePickerWithLabel from "../../components/datepicker/DatePickerWithLabel";
import ScheduledDatesLength from "../../components/containers/ScheduleDays";
import { DateType } from "../../types/app.types";

const SchedulePage = () => {
  const {
    isSuccessUploadModalShown,
    dispatch,
    startDate,
    endDate,
    dates,
    actions,
    pagination,
    weekDates,
    isAutocompleteAvailable,
  } = useAppContext() as any;

  const {
    addTime,
    resetHandler,
    changeDateHandler,
    removeTimeSlotHandler,
    nextWeekHandler,
    previousWeekHandler,
    setWeekDates,
    setDates,
    autocomplete,
    changeTimeHandler,
    setStartDateOnly,
  } = actions;

  useEffect(() => {
    setDates(startDate, endDate);
  }, [endDate]);

  useEffect(() => {
    setStartDateOnly(startDate, dates);
  }, [startDate]);

  const pages = Math.ceil(dates.length / 7);

  useEffect(() => {
    setWeekDates();
  }, [pagination, dates]);

  const arrowHandler = (e: any) => {
    const name = e.target.name;

    if (name == "next" && pagination < pages - 1) {
      nextWeekHandler(pages);
    }

    if (name == "previous" && pagination > 0) {
      previousWeekHandler();
    }
  };

  const uploadHandler = async () => {
    const uploadObject = {
      startDate: new Date(startDate).toJSON(),
      endDate: new Date(endDate).toJSON(),
      dates: dates.map((date: DateType) => ({
        ...date,
        date: date.date.toJSON(),
      })),
    };

    downloadFile(uploadObject);
    dispatch({ type: ActionTypes.TOGGLESUCCESSMODAL });
  };

  let isResetButtonDisabled = dates.some((date: any) => date.timeSlots.length);

  let doesAllTimeslostsHaveTimes = dates?.every((date: any) =>
    date.timeSlots.every((timeslot: any) => timeslot.time.length)
  );

  let isUploadButtonDisabled =
    dates.length &&
    dates?.every((date: any) => date.timeSlots.length >= 1) &&
    doesAllTimeslostsHaveTimes;

  let autocompleteDisable =
    !isAutocompleteAvailable ||
    !isResetButtonDisabled ||
    isUploadButtonDisabled;

  return (
    <main className="app-container">
      {isSuccessUploadModalShown && <SuccessfulUploadModal />}
      <div className="schedule-tool-container">
        <header className="app-header">Create new Schedule</header>

        <section className="header-section">
          <div className="datepickers-container">
            <DatePickerWithLabel
              labelText="Start-Date"
              handler={changeDateHandler}
              selectedValue={startDate}
              name="startDate"
            />
            <DatePickerWithLabel
              labelText="End-Date"
              handler={changeDateHandler}
              selectedValue={endDate}
              name="endDate"
            />
            {dates.length > 0 && (
              <ScheduledDatesLength datesLength={dates.length} />
            )}
          </div>

          {dates.length > 0 && (
            <div className="pagination-buttons-container">
              <button
                onClick={arrowHandler}
                name="previous"
                disabled={pagination == 0}
                className="pagination-button"
              >
                &#8249;
              </button>
              <button
                onClick={arrowHandler}
                name="next"
                disabled={pagination == pages - 1}
                className="pagination-button"
              >
                &#8250;
              </button>
            </div>
          )}
        </section>

        <DatesContainer
          dates={weekDates}
          deleteHandler={removeTimeSlotHandler}
          addTimeHandler={addTime}
          changeTimeHandler={changeTimeHandler}
        ></DatesContainer>

        <ActionButtonsContainer>
          <ActionButton
            text="Reset"
            onClickHandler={resetHandler}
            disabled={!isResetButtonDisabled}
          />

          <ActionButton
            text="Autocomplete"
            color="#E11BB6"
            onClickHandler={autocomplete}
            disabled={autocompleteDisable}
          />

          <ActionButton
            text="Upload"
            onClickHandler={uploadHandler}
            disabled={!isUploadButtonDisabled}
          />
        </ActionButtonsContainer>
      </div>
    </main>
  );
};

export default SchedulePage;
