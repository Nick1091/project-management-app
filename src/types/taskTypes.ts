export type TaskInput = {
  title: string;
  description: string;
};

export type TaskSearch = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  user: {
    name: string;
  };
};
