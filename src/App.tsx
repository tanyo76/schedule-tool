import { useEffect } from "react";
import SchedulePage from "./pages/schedule-page/SchedulePage";
import { AppContextProvider } from "./context/AppContext";

function App() {
  useEffect(() => {
    document.title = "Schedule Tool";
  }, []);

  Date.prototype.toJSON = function () {
    return (
      new Date(this).toLocaleDateString("en-US") +
      " " +
      new Date(this).toLocaleTimeString("en-US")
    );
  };

  return (
    <AppContextProvider>
      <SchedulePage />
    </AppContextProvider>
  );
}

export default App;
