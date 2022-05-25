export type CreateTaskType = {
  token: string;
  boardId: string;
  columnId: string;
  taskTitle: string;
  userId: string;
  description: string;
  taskId?: string;
};
export type EditTaskType = {
  token: string;
  boardId: string;
  columnId: string;
  taskTitle: string;
  order: number;
  userId: string;
  description: string;
  taskId?: string;
};
export type DeleteTaskType = {
  token: string;
  boardId: string;
  columnId: string;
  taskId: string;
};
