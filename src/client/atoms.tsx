import { atom } from "jotai";

export interface UserType {
  id: number | null;
  username: string;
}

const userAtom = atom<UserType>({
  id: null,
  username: "",
});

export { userAtom };
