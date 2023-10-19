import { create } from "zustand"

interface HackathonContextState {
    hackathonSubProfileAddress: string
    setHackathonSubProfileAddress: (hackathonSubProfileAddress: string) => void
}
const useHackathonStore = create<HackathonContextState>()((set) => ({
    hackathonSubProfileAddress: "",
    setHackathonSubProfileAddress: (hackathonSubProfileAddress: string) => set({ hackathonSubProfileAddress }),
}))

export default useHackathonStore