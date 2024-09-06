import { atom } from "jotai";

export interface UserType {
  id: null | number;
  created_at: string;
  username: string;
  password: string;
}

const user = atom({
  id: null,
  created_at: "",
  username: "",
  password: "",
});

export { user };
