import { create } from "zustand"

interface SimpleUserContextState {
    simpleUserAccount: string
    setSimpleUserAccount: (simpleUserAccount: string) => void
}

const useSimpleUserStore = create<SimpleUserContextState>()((set) => ({
    simpleUserAccount: "",
    setSimpleUserAccount: (simpleUserAccount: string) => set({ simpleUserAccount }),
}))

export default useSimpleUserStore