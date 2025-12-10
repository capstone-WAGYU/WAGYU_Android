import { create } from "zustand";

export interface PetData {
  name: string;
  breed: string;
  age: string;
  gender: string;
  disease: string;
}

interface PetStore {
  pets: PetData[];
  addPet: (pet: PetData) => void;
}

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  addPet: (pet) =>
    set((state) => ({
      pets: [...state.pets, pet],
    })),
}));
