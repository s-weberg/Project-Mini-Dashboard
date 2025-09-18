import Quote from "./components/quotes.tsx";
import TaskManager from "./components/taskManager.tsx";
import Weather from "./components/weather.tsx";

function App() {
  return (
    <div>
      <div>
        <Quote />
      </div>
      <div>
        <TaskManager />
        <Weather />
      </div>
    </div>
  );
}

export default App;
