import { useState } from "react";
import type { Priority, Status, Task } from "./components/types.tsx";
import { TaskRow } from "./components/TaskRow";
import { FilterBar } from "./components/FilterBar";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("low");
  const [editTask, setEditTask] = useState<{ id: number | null; text: string }>(
    { id: null, text: "" }
  );
  const [filter, setFilter] = useState<Status>("all");
  const [prioritySorted, setPrioritySorted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

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

  const visibleTasks = getSortedTasks().filter((task) =>
    task.text.toLowerCase().includes(searchText.toLowerCase())
  );

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
            className="border ml-1 text-center focus:outline-none focus:border-blue-500"
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

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          onSortClick={handleFilterIconClick}
          sorted={prioritySorted}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />

        {showSearch && (
          <SearchBar value={searchText} onChange={setSearchText} />
        )}

        <div className="space-y-2">
          {visibleTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={startEditTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
