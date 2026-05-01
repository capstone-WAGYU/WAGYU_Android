// src/store/petStore.ts
import { Breed, Disease, Pet, petApi } from "@/api/petApi";
import { create } from "zustand";

interface PetStore {
  pets: Pet[];
  breeds: Breed[];
  diseases: Disease[];
  loading: boolean;
  error: string | null;
  petImages: Record<number, string>;

  // Actions
  fetchPets: () => Promise<void>;
  setPetImage: (petId: number, uri: string) => void;
  fetchBreeds: () => Promise<void>;
  fetchDiseasesByBreed: (breedId: number) => Promise<void>;
  addPet: (petData: {
    name: string;
    age: number;
    breedId: number;
    gender: "M" | "F";
    diseaseIds: number[];
    imageUri?: string;
  }) => Promise<void>;
  updatePetInStore: (id: number, updatedPet: Pet) => void;
  setPets: (pets: Pet[]) => void;
  clearDiseases: () => void;
  clearError: () => void;
}

export const usePetStore = create<PetStore>((set, get) => ({
  pets: [],
  breeds: [],
  diseases: [],
  loading: false,
  error: null,
  petImages: {},

  setPetImage: (petId, uri) =>
    set((state) => ({ petImages: { ...state.petImages, [petId]: uri } })),

  fetchPets: async () => {
    set({ loading: true, error: null });
    try {
      const pets = await petApi.getPets();
      set({ pets, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchBreeds: async () => {
    set({ loading: true, error: null });
    try {
      const breeds = await petApi.getBreeds();
      set({ breeds, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchDiseasesByBreed: async (breedId: number) => {
    set({ loading: true, error: null });
    try {
      const diseases = await petApi.getDiseasesByBreed(breedId);
      set({ diseases, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addPet: async (petData) => {
    set({ loading: true, error: null });
    try {
      await petApi.createPet(petData);
      await get().fetchPets();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updatePetInStore: (id: number, updatedPet: Pet) => {
    set((prev) => ({
      pets: prev.pets.map((p) => (p.id === id ? updatedPet : p)),
    }));
  },

  setPets: (pets: Pet[]) => set({ pets }),

  clearDiseases: () => set({ diseases: [] }),
  clearError: () => set({ error: null }),
}));
