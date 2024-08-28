import { useEffect } from "react";

import ActionButton from "../../components/buttons/ActionButton";
import ActionButtonsContainer from "../../components/containers/ActionButtonsContainer";
import DatesContainer from "../../components/containers/DatesContainer";
import { downloadFile } from "../../utils/download";
import SuccessfulUploadModal from "../../components/modals/SuccessfulUploadModal";
import { useAppContext } from "../../context/AppContext";
import { ActionTypes } from "../../context/reducers/appReducer";

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
  } = actions;

  useEffect(() => {
    setDates(startDate, endDate);
  }, [startDate, endDate]);

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
      startDate: startDate,
      endDate: endDate,
      dates,
    };

    downloadFile(uploadObject);
    dispatch({ type: ActionTypes.TOGGLESUCCESSMODAL });
  };

  let isResetButtonDisabled = dates.some((date: any) => date.timeSlots.length);

  let isUploadButtonDisabled =
    dates.length && dates?.every((date: any) => date.timeSlots.length >= 1);

  let autocompleteDisable =
    !isAutocompleteAvailable ||
    !isResetButtonDisabled ||
    isUploadButtonDisabled;

  return (
    <div className="container">
      {isSuccessUploadModalShown && <SuccessfulUploadModal />}
      <h1>Create new Schedule</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <input
            type="date"
            onChange={changeDateHandler}
            name="startDate"
            value={startDate}
          />
          <input
            type="date"
            onChange={changeDateHandler}
            name="endDate"
            value={endDate}
          />
          {dates.length > 0 && (
            <p>
              {dates.length} {dates.length == 1 ? "day" : "days"}
            </p>
          )}
        </div>

        {dates.length > 0 && (
          <div style={{ marginRight: "20px" }}>
            <button
              onClick={arrowHandler}
              name="previous"
              disabled={pagination == 0}
            >
              previous
            </button>
            <button
              onClick={arrowHandler}
              name="next"
              disabled={pagination == pages - 1}
            >
              next
            </button>
          </div>
        )}
      </div>

      <hr />

      <DatesContainer
        dates={weekDates}
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
  );
};

export default SchedulePage;
