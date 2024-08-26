import { useEffect } from "react";

import ActionButton from "../../components/buttons/ActionButton";
import ActionButtonsContainer from "../../components/containers/ActionButtonsContainer";
import DatesContainer from "../../components/containers/DatesContainer";
import { getDates } from "../../utils/date";
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
  } = useAppContext() as any;

  const { addTime, resetHandler, changeDateHandler, removeTimeSlotHandler } =
    actions;

  useEffect(() => {
    const datesResult = getDates(new Date(startDate), new Date(endDate));

    dispatch({ type: ActionTypes.SETDATES, payload: datesResult });
  }, [startDate, endDate]);

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

  //  :TODO Disable autocomplete button
  // :TODO Add autocomplete functionality
  let isAutocompleteDisabled = isResetButtonDisabled;

  return (
    <div className="container">
      {isSuccessUploadModalShown && <SuccessfulUploadModal />}
      <h1>Create new Schedule</h1>
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

      {dates.length > 0 && <p>{dates.length} days</p>}
      <hr />

      <DatesContainer
        dates={dates}
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
