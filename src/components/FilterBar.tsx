import { FilterIcon } from "./FilterIcon";
import type { Status } from "./types";

type FilterBarProps = {
  filter: Status;
  setFilter: (status: Status) => void;
  onSortClick: () => void;
  sorted: boolean;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FilterBar({
  filter,
  setFilter,
  onSortClick,
  sorted,
  showSearch,
  setShowSearch,
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
      <div className="flex items-center">
        <button
          type="button"
          className="text-gray-600 hover:text-blue-500"
          onClick={() => setShowSearch((any) => !any)}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <FilterIcon
          className={`ml-2 w-8 h-8 hover:opacity-60 transition-opacity cursor-pointer ${
            sorted ? "opacity-60" : ""
          }`}
          onClick={onSortClick}
        />
      </div>
    </div>
  );
}
