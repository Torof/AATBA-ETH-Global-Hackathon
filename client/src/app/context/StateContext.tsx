import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react"

type ContextType = {
    simpleUserAccount: string
    setSimpleUserAccount: Dispatch<SetStateAction<string>>
}

const Context = createContext<ContextType>({
    simpleUserAccount: "",
    setSimpleUserAccount: () => null,
})

type Props = {
    children: ReactNode
}

export const StateContext = ({ children }: Props) => {
    const [simpleUserAccount, setSimpleUserAccount] = useState<string>("")

    return (
        <Context.Provider
            value={{
                simpleUserAccount,
                setSimpleUserAccount
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)