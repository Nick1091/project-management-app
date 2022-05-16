export interface ILoginObj {
  login: string;
  password: string;
  name?: string;
}

export interface ILoginObjWithID extends ILoginObj {
  id: string;
  token: string;
}
