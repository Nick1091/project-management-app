import { ItemTypesType } from '../types';

const URL = 'https://project-management-app-65.herokuapp.com';

export const REQUEST_URLS = {
  SING_UP_URL: `${URL}/signup`,
  SING_IN_URL: `${URL}/signin`,
  BOARDS_URL: `${URL}/boards`,
  USERS: `${URL}/users`,
};

export const contacts = [
  { name: 'Igor Alyanoy', link: 'https://github.com/alyanoyigor', id: 0 },
  { name: 'Nikolaу Kuckharchuk', link: 'https://github.com/Nick1091', id: 1 },
  { name: 'Anna Voroshilova', link: 'https://github.com/VoroshilovaAV', id: 2 },
];

export const ItemTypes: ItemTypesType = {
  COLUMN: 'column',
};
