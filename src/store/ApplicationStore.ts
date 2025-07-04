import { ApplicationState } from "@/interface/store/ApplicationStore";
import { create } from "zustand";

export const useApplicationStore = create<ApplicationState>((set) => ({
  menuBarVisible: false,
  setMenuBarVisible: (status) => set({ menuBarVisible: status }),
  toggleMenuBar: () =>
    set((state) => ({ menuBarVisible: !state.menuBarVisible })),
  applicationVersion: "",
  setApplicationVersion: (version) => set({ applicationVersion: version }),
  onlineApplicationVersion: "",
  setOnlineApplicationVersion: (version) =>
    set({ onlineApplicationVersion: version }),
  applicationUpdateAvailable: false,
  setApplicationUpdateAvailable: (status) =>
    set({ applicationUpdateAvailable: status }),
  applicationUpdateCheckError: false,
  setApplicationUpdateCheckError: (status) =>
    set({ applicationUpdateCheckError: status }),
  applicationUpdateChecked: false,
  setApplicationUpdateChecked: (status) =>
    set({ applicationUpdateChecked: status }),
}));
