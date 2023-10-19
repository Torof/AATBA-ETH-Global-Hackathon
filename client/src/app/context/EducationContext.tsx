import { create } from "zustand"
interface EducationContextState {
    educationSubProfileAddress: string
    setEducationSubProfileAddress: (educationSubProfileAddress: string) => void
}
const useEducationStore = create<EducationContextState>()((set) => ({
    educationSubProfileAddress: "",
    setEducationSubProfileAddress: (educationSubProfileAddress: string) => set({ educationSubProfileAddress }),
}))

export default useEducationStore