import { create } from "zustand";
import {jwtDecode} from "jwt-decode";

type AuthState = {
token: string | null;
id: string | null;
setToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
token: null,
id: null,
setToken: (token: string) => {
const decoded: any = jwtDecode(token);
const id = decoded.user_id; // Map user_id to id
set({ token, id });
},
}));