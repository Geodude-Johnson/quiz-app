import { atom } from "jotai";

export interface UserType {
  id: number | null;
  username: string;
}

const userAtom = atom<UserType>({
  id: null,
  username: "",
});

export interface CollectionType {
  id: number | null;
  userId: number | null;
  name: string;
}

const collectionAtom = atom<CollectionType>({
  id: null,
  userId: null,
  name: "",
});

export { userAtom, collectionAtom };
