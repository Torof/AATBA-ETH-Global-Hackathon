import { create } from "zustand"

interface WorkContextState {
    workSubProfileAddress: string
    setWorkSubProfileAddress: (workSubProfileAddress: string) => void
}
const useWorkStore = create<WorkContextState>()((set) => ({
    workSubProfileAddress: "",
    setWorkSubProfileAddress: (workSubProfileAddress: string) => set({ workSubProfileAddress }),
}))

export default useWorkStore