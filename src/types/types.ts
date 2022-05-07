export type BoardData = {
  id: string;
  title: string;
};

export type BoardsState = {
  boards: BoardData[];
  isLoading: boolean;
  error: string | null;
};

export type State = {
  boards: BoardsState;
};
