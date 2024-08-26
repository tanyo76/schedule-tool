import { useEffect } from "react";
import SchedulePage from "./pages/schedule-page/SchedulePage";
import { AppContextProvider } from "./context/AppContext";

function App() {
  useEffect(() => {
    document.title = "Schedule Tool";
  }, []);

  return (
    <AppContextProvider>
      <SchedulePage />
    </AppContextProvider>
  );
}

export default App;
