import React, { createContext, useState } from 'react'
type UserCardType = [
    defaultCard: any,
    setDefaultCard: React.Dispatch<React.SetStateAction<any>>
]
 
const userCardDefault: UserCardType = [false, () => { }]
export const CardContext = createContext<UserCardType>(userCardDefault)
export default function CardContextProvider({ children }: { children: React.ReactNode }) {
    const [defaultCard, setDefaultCard] = useState<boolean>(false)
    return (
        <CardContext.Provider value={[defaultCard, setDefaultCard]}>
            {children}
        </CardContext.Provider>

    )

}
