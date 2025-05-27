import { create } from "zustand";
import { persist } from "zustand/middleware";

// Type for the settings of the sidebar
type SidebarSettings = {
  disabled: boolean;
  isHoverOpen: boolean;
};

// Type representing the sidebar store state and actions
type SidebarState = {
  isOpen: boolean;
  isHover: boolean;
  settings: SidebarSettings;

  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsHover: (isHover: boolean) => void;
  updateSettings: (newSettings: Partial<SidebarSettings>) => void;
  getOpenState: () => boolean;
};

// Initial state for the sidebar store
const initialSidebarState: Omit<
  SidebarState,
  "toggleOpen" | "setIsOpen" | "setIsHover" | "updateSettings" | "getOpenState"
> = {
  isOpen: true,
  isHover: false,
  settings: {
    disabled: false,
    isHoverOpen: false,
  },
};

// Zustand store for managing sidebar state
export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      // Initial states
      isOpen: initialSidebarState.isOpen,
      isHover: initialSidebarState.isHover,
      settings: initialSidebarState.settings,

      toggleOpen: () =>
        set((state: SidebarState) => ({ isOpen: !state.isOpen })),

      setIsOpen: (isOpen) => set(() => ({ isOpen })),

      setIsHover: (isHover) => set(() => ({ isHover })),

      updateSettings: (newSettings) =>
        set((state: SidebarState) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      getOpenState: () => {
        const { isOpen, isHover, settings } = get();
        return isOpen || (settings.isHoverOpen && isHover);
      },
    }),
    {
      name: "sidebar",
      partialize: (state) => ({ settings: state.settings }),
    } // Only persist the settings field
  )
);
