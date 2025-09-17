import { useState } from "react";
import type { Task } from "./components/types.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState<{ id: number | null; text: string }>(
    { id: null, text: "" }
  );

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
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

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
            placeholder="Add a new task..."
          />
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
              className="flex-1 p-2  rounded-l-lg focus:outline-none focus:border-blue-500"
              placeholder="Add new text..."
            />
            <button
              onClick={updateTask}
              className=" bg-gray-500 text-white px-4 rounded-r-lg hover:bg-gray-600"
            >
              Update
            </button>
          </div>
        )}

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
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

              <button onClick={() => startEditTask(task)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>

              <button onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
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
