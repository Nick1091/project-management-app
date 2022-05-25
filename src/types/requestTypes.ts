export type CreateTaskTypes = {
  token: string;
  boardId: string;
  columnId: string;
  taskTitle: string;
  userId: string;
  description: string;
  taskId?: string;
};
export type EditTaskTypes = {
  token: string;
  boardId: string;
  columnId: string;
  taskTitle: string;
  order: number;
  userId: string;
  description: string;
  taskId?: string;
};
export type DeleteTaskTypes = {
  token: string;
  boardId: string;
  columnId: string;
  taskId: string;
};
