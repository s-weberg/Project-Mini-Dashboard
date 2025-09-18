import { FilterIcon } from "./FilterIcon";
import type { Status } from "./types";

type FilterBarProps = {
  filter: Status;
  setFilter: (status: Status) => void;
  onSortClick: () => void;
  sorted: boolean;
};

export function FilterBar({
  filter,
  setFilter,
  onSortClick,
  sorted,
}: FilterBarProps) {
  return (
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
      <FilterIcon
        className={`w-8 h-8 hover:opacity-60 transition-opacity cursor-pointer ${
          sorted ? "opacity-60" : ""
        }`}
        onClick={onSortClick}
      />
    </div>
  );
}
