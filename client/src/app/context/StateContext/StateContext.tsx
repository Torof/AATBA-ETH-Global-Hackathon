import { create } from "zustand"

interface ContextState {
    simpleUserAccount: string
    setSimpleUserAccount: (simpleUserAccount: string) => void
}

export const useContextStore = create<ContextState>()((set) => ({
    simpleUserAccount: "",
    setSimpleUserAccount: (simpleUserAccount: string) => set({ simpleUserAccount }),
}))
