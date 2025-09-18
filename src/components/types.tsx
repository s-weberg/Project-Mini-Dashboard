export type Priority = "low" | "medium" | "high";
export type Status = "all" | "completed" | "pending";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  status: Status;
}

/* Tried to use enums instead of union types but ran into issues with React state management
 */
