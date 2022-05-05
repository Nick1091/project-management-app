import axios from 'axios';
import { BOARDS_URL } from '../urls/urls';

export const getBoards = async (token: string) => {
  const response = await axios.get(BOARDS_URL, {
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBoard = async (token: string, title: string) => {
  const response = await axios.post(
    BOARDS_URL,
    { title },
    {
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
