import { petApi, ReservationSummary } from "@/api/petApi";
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
  status?: "PENDING" | "ACCEPTED" | "RESOLVED" | "REJECTED";
}

const formatTime = (t: ReservationSummary["time"]): string => {
  if (typeof t === "string") return (t as string).slice(0, 5);
  return `${String(t.hour).padStart(2, "0")}:${String(t.minute).padStart(2, "0")}`;
};

const toReservation = (r: ReservationSummary): Reservation => ({
  id: r.id.toString(),
  hospitalId: 0,
  hospitalName: r.hospitalName,
  hospitalAddress: "",
  date: r.date,
  time: formatTime(r.time),
  petId: 0,
  petName: r.petName,
  visitReason: "",
  phone: "",
  request: "",
  status: r.status,
});

interface ReservationStore {
  reservations: Reservation[];
  loading: boolean;
  fetchReservations: () => Promise<void>;
  clearReservations: () => void;
}

export const useReservationStore = create<ReservationStore>((set) => ({
  reservations: [],
  loading: false,
  fetchReservations: async () => {
    set({ loading: true });
    try {
      const data = await petApi.getReservations();
      set({ reservations: data.map(toReservation) });
    } catch {
    } finally {
      set({ loading: false });
    }
  },
  clearReservations: () => set({ reservations: [] }),
}));
