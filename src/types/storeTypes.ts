export type TypeToken = {
  token: string;
};

export type UserID = {
  id: string;
  name: string;
  login: string;
};

export type BoardData = {
  id: string;
  title: string;
};

export type BoardsState = {
  boards: BoardData[];
  isLoading: boolean;
  error: string | null;
};
