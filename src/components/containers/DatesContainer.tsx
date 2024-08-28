import { useState } from "react";
import { DatesContainerProps } from "../../types/prop.types";

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
    <div
      style={{
        height: "80vh",
        display: "flex",
        overflow: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "1200px",
          display: "flex",
          overflow: "auto",
          alignItems: "center",
        }}
      >
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
                      <button
                        className="actionButton"
                        style={{
                          backgroundColor: "#5C5C5C",
                          border: "none",
                          fontSize: "100",
                        }}
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
    </div>
  );
};

export default DatesContainer;
