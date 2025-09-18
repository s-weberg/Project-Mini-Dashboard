import { useState } from "react";
import type { Priority, Status, Task } from "./components/types.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FilterIcon } from "./components/FilterIcon";

const priorityMap = {
  high: { num: 1, color: "bg-red-500" },
  medium: { num: 2, color: "bg-yellow-400" },
  low: { num: 3, color: "bg-green-500" },
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("low");
  const [editTask, setEditTask] = useState<{ id: number | null; text: string }>(
    { id: null, text: "" }
  );
  const [filter, setFilter] = useState<Status>("all");
  const [prioritySorted, setPrioritySorted] = useState(false);

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  const getSortedTasks = () => {
    if (!prioritySorted) return filteredTasks;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...filteredTasks].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: newPriority, // newPriority is a string
        status: "pending",
      },
    ]);
    setNewTask("");
    setNewPriority("low");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditTask = (task: Task) => {
    setEditTask({ id: task.id, text: task.text });
  };

  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTask.id ? { ...task, text: editTask.text } : task
      )
    );
    setEditTask({ id: null, text: "" });
  };

  const handleFilterIconClick = () => {
    setPrioritySorted((any) => !any);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>

        <div className="flex mb-10">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
            placeholder="Add task... and priority"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as Priority)}
            className="border rounded-l-lg focus:outline-none focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {editTask.id && (
          <div className="mb-4 border-zinc-600 p-0 bg-gray-100 rounded flex justify-end">
            <input
              value={editTask.text}
              onChange={(e) =>
                setEditTask({ ...editTask, text: e.target.value })
              }
              className="flex-1 p-2 rounded-l-lg focus:outline-none focus:border-blue-500"
              placeholder="Add new text..."
            />
            <button
              onClick={updateTask}
              className="bg-gray-500 text-white px-4 rounded-r-lg hover:bg-gray-600"
            >
              Update
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className="px-2 py-1 rounded bg-gray-200"
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className="px-2 py-1 rounded bg-yellow-200"
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className="px-2 py-1 rounded bg-green-200"
            >
              Completed
            </button>
          </div>
          <FilterIcon className="w-8 h-8 ..." onClick={handleFilterIconClick} />
        </div>

        <div className="space-y-2">
          {getSortedTasks().map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <label className="flex items-center flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3 h-4 w-4 cursor-pointer accent-blue-500"
                />
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.text}
                </span>
              </label>

              <button onClick={() => startEditTask(task)} className="ml-2">
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button onClick={() => deleteTask(task.id)} className="ml-2">
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <span
                className={`ml-4 font-semibold w-7 h-7 flex items-center justify-center rounded-full text-white ${
                  priorityMap[task.priority].color
                }`}
              >
                {priorityMap[task.priority].num}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-gray-600">
          <p>Kanske quote kan hamna härnere?</p>
        </div>
      </div>
    </div>
  );
}

export default App;
