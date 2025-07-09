import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialSidebarState = {
  isOpen: true,
  isHover: false,
  settings: {
    disabled: false,
    isHoverOpen: false,
  },
};

// Zustand store for managing sidebar state
export const useSidebarStore = create()(
  persist(
    (set, get) => ({
      isOpen:true,
      isHover: initialSidebarState.isHover,
      settings: initialSidebarState.settings,

      toggleOpen: () =>
        set((state) => ({ isOpen: !state.isOpen })),

      setIsOpen: (isOpen) => set(() => ({ isOpen })),

      setIsHover: (isHover) => set(() => ({ isHover })),

      updateSettings: (newSettings) =>
        set((state) => ({
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
