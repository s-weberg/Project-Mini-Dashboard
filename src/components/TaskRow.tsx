import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import type { Task } from "./types";

const priorityMap = {
  high: { num: 1, color: "bg-red-500" },
  medium: { num: 2, color: "bg-yellow-400" },
  low: { num: 3, color: "bg-green-500" },
};

export function TaskRow({
  task,
  onToggle,
  onEdit,
  onDelete,
}: {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <label className="flex items-center flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
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
      <button onClick={() => onEdit(task)} className="ml-2">
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
      <button onClick={() => onDelete(task.id)} className="ml-2">
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
  );
}
