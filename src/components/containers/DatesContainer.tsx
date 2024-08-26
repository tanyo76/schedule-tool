import { DateType } from "../../types/date.types";

type DatesContainerProps = {
  dates: DateType[];
  deleteHandler: Function;
};

const DatesContainer = ({ dates, deleteHandler }: DatesContainerProps) => {
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
                }}
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
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DatesContainer;
