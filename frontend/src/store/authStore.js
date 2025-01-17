import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  isLoadingRegister: false,
  isLoadingLogin: false,
  isCheckingAuth: true,
  isLoadingLogout: false,
  user: null,

  register: async (credentials) => {
    set({ isLoadingRegister: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      if (response.status === 200) {
        set({ user: response.data.user });
      }
      toast.success("Usuario registrado");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingRegister: false });
    }
  },

  login: async (credentials) => {
    set({ isLoadingLogin: true });
    try {
      const response = await axios.post("/api/v1/auth/signin", credentials);
      if (response.status === 200) {
        set({ user: response.data.user });
      }
      toast.success("Usuario logueado");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingLogin: false });
    }
  },

  logout: () => {
    set({ isLoadingLogout: true });
    try {
      axios.post("/api/v1/auth/signout");
      set({ user: null });
      toast.success("Usuario deslogueado");
    } catch (error) {
      console.error(error.response.data.message);
    } finally {
      set({ isLoadingLogout: false });
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      if (response.status === 200) {
        set({ user: response.data.user });
      }
    } catch (error) {
      console.error(error.response.data.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
