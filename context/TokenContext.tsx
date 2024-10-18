import React, { createContext, useState } from 'react'
type UserAuthType = [
    IsAuthorised: boolean,
    setIsAuthorised: React.Dispatch<React.SetStateAction<boolean>>
]
 
const userCartDefault: UserAuthType = [false, () => { }]
export const TokenContext = createContext<UserAuthType>(userCartDefault)
export default function TokenContextProvider({ children }: { children: React.ReactNode }) {
    const [IsAuthorised, setIsAuthorised] = useState<boolean>(false)
    return (
        <TokenContext.Provider value={[IsAuthorised, setIsAuthorised]}>
            {children}
        </TokenContext.Provider>

    )

}
