import { useState } from "react";
import { DatesContainerProps } from "../../types/prop.types";
import DateInfo from "../common/DateInfo";

const DatesContainer = ({
  dates,
  deleteHandler,
  addTimeHandler,
  changeTimeHandler,
}: DatesContainerProps) => {
  const [isAddPlaceholderVisible, setIsAddPlaceholderVisible] = useState({
    dateId: 0,
    isVisible: false,
    timeslotId: null,
  });

  const addTimePlaceholder = (dateId: number, isVisible: boolean) => {
    setIsAddPlaceholderVisible((prevState) => ({
      ...prevState,
      dateId,
      isVisible,
    }));
  };

  const onTimeChangeHandler = (e: any, dateId: number, timeslotId: number) => {
    const value = e.target.value;
    changeTimeHandler({ dateId, timeslotId, value });
  };

  const appendDeleteButton = (timeslotId: number | null) => {
    setIsAddPlaceholderVisible(
      (prevState) =>
        ({
          ...prevState,
          timeslotId,
        } as any)
    );
  };

  return (
    <section className="dates-container">
      <div className="dates-inner-container">
        {dates &&
          dates.map((date) => {
            const day = date.date.toLocaleDateString("en", {
              weekday: "long",
            });
            const weekDate = date.date.toLocaleDateString("en", {
              dateStyle: "short",
            });

            return (
              <div key={date.id} className="date-container">
                <DateInfo day={day} date={weekDate} />
                <div
                  className="timeslots-container"
                  id="timeslotsContainer"
                  onMouseEnter={() => addTimePlaceholder(date.id, true)}
                  onMouseLeave={() => addTimePlaceholder(date.id, false)}
                >
                  {date.timeSlots.map((timeSlot) => (
                    <div
                      className="timeslot-button"
                      key={timeSlot.id}
                      onMouseEnter={() => appendDeleteButton(timeSlot.id)}
                      onMouseLeave={() => appendDeleteButton(null)}
                    >
                      <input
                        type="time"
                        className="time-button"
                        value={timeSlot.time}
                        onChange={(e) =>
                          onTimeChangeHandler(e, date.id, timeSlot.id)
                        }
                      />

                      {isAddPlaceholderVisible.dateId == date.id &&
                        isAddPlaceholderVisible.isVisible &&
                        timeSlot.id == isAddPlaceholderVisible.timeslotId && (
                          <span
                            onClick={() => deleteHandler(date.id, timeSlot.id)}
                            className="delete-time-button"
                          >
                            X
                          </span>
                        )}
                    </div>
                  ))}
                  {isAddPlaceholderVisible.dateId == date.id &&
                    isAddPlaceholderVisible.isVisible && (
                      <button
                        className="add-time-button"
                        onClick={() => addTimeHandler(date.id)}
                      >
                        Add Time
                      </button>
                    )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default DatesContainer;
