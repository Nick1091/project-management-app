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

export type BoardData = {
  id: string;
  title: string;
};

export type BoardsState = {
  boards: BoardData[];
  isLoading: boolean;
  error: string | null;
};
