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
export type UpdateTaskType = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};
export type DeleteTaskType = {
  token: string;
  boardId: string;
  columnId: string;
  taskId: string;
};

export type TypeUpdateTask = {
  token: string;
  boardId: string;
  taskId: string;
  columnId: string;
  draggedTask: UpdateTaskType;
};
