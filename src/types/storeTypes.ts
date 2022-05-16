export type TypeToken = {
  token: string;
  login: string;
};

export type UserID = {
  id: string;
  name: string;
  login: string;
};
export type UserIDPassword = {
  id: string;
  name: string;
  login: string;
  password: string;
};

export type BoardPreview = {
  id: string;
  title: string;
};

type BasicComponentsState = {
  isLoading: boolean;
  error: string | null;
};

export type MainBoards = {
  boards: BoardPreview[];
} & BasicComponentsState;

export type TaskState = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: {
    filename: string;
    fileSize: string;
  };
};

export type ColumnState = {
  id: string;
  title: string;
  order: number;
  tasks: TaskState[];
};

export type BoardState = {
  columns: ColumnState[];
  boardTitle: string;
} & BasicComponentsState;
