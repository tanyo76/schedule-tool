import { useState } from "react";
import { DateType } from "../../types/date.types";

type DatesContainerProps = {
  dates: DateType[];
  deleteHandler: Function;
  addTimeHandler: Function;
};

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
    <div style={{ height: "450px", display: "flex", overflow: "auto" }}>
      {dates &&
        dates.map((date) => {
          const day = date.date.toLocaleDateString("en", {
            weekday: "long",
          });
          const dayOfTheWeek = date.date.toLocaleDateString("en", {
            dateStyle: "short",
          });

          return (
            <div
              key={date.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "44px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontWeight: "bold" }}>{day}</p>
                <p>{dayOfTheWeek}</p>
              </div>
              <div
                style={{
                  height: "286px",
                  width: "160px",
                  backgroundColor: "#F5F5F5",
                  margin: "5px 5px",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid red",
                }}
                id="timeslotsContainer"
                onMouseEnter={() => addTimePlaceholder(date.id, true)}
                onMouseLeave={() => addTimePlaceholder(date.id, false)}
              >
                {date.timeSlots.map((timeSlot) => (
                  <button
                    key={timeSlot.id}
                    style={{
                      border: "1px solid #E11BB6",
                      backgroundColor: "white",
                      color: "#E11BB6",
                      fontSize: "20px",
                      padding: "15px",
                      marginBottom: "15px",
                    }}
                    onClick={() => deleteHandler(date.id, timeSlot.id)}
                  >
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
                    <button onClick={() => addTimeHandler(date.id)}>+</button>
                  )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DatesContainer;
