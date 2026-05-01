import { create } from "zustand";

export interface Reservation {
  id: string;
  hospitalId: number;
  hospitalName: string;
  hospitalAddress: string;
  date: string;
  time: string;
  petId: number;
  petName: string;
  visitReason: string;
  phone: string;
  request: string;
}

interface ReservationStore {
  reservations: Reservation[];
  addReservation: (r: Reservation) => void;
  removeReservation: (id: string) => void;
}

export const useReservationStore = create<ReservationStore>((set) => ({
  reservations: [],
  addReservation: (r) =>
    set((state) => ({ reservations: [r, ...state.reservations] })),
  removeReservation: (id) =>
    set((state) => ({
      reservations: state.reservations.filter((r) => r.id !== id),
    })),
}));
