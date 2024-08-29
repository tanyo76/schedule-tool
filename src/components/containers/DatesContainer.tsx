import { useState } from "react";
import { DatesContainerProps } from "../../types/prop.types";
import DateInfo from "../common/DateInfo";

const DatesContainer = ({
  dates,
  deleteHandler,
  addTimeHandler,
}: DatesContainerProps) => {
  const [isAddPlaceholderVisible, setIsAddPlaceholderVisible] = useState({
    dateId: 0,
    isVisible: false,
  });

  const addTimePlaceholder = (dateId: number, isVisible: boolean) => {
    setIsAddPlaceholderVisible({ dateId, isVisible });
  };

  return (
    <section className="dates-container">
      <div className="dates-inner-container">
        {dates &&
          dates.map((date) => {
            const day = date.date.toLocaleDateString("en", {
              weekday: "long",
            });
            const dayOfTheWeek = date.date.toLocaleDateString("en", {
              dateStyle: "short",
            });

            return (
              <div key={date.id} className="date-container">
                <DateInfo day={day} dayOfTheWeek={dayOfTheWeek} />
                <div
                  className="timeslots-container"
                  id="timeslotsContainer"
                  onMouseEnter={() => addTimePlaceholder(date.id, true)}
                  onMouseLeave={() => addTimePlaceholder(date.id, false)}
                >
                  {date.timeSlots.map((timeSlot) => (
                    <button key={timeSlot.id} className="timeslot-button">
                      {timeSlot.time}
                      <span
                        style={{ marginLeft: "20px" }}
                        onClick={() => deleteHandler(date.id, timeSlot.id)}
                      >
                        X
                      </span>
                    </button>
                  ))}
                  {isAddPlaceholderVisible.dateId == date.id &&
                    isAddPlaceholderVisible.isVisible && (
                      <button
                        className="actionButton add-time-button"
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
