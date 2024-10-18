import React, { createContext, useState } from 'react'
import { rolesObj } from '../src/utils/constant'
type UserAuthType = [
    IsAuthorised: boolean,
    setIsAuthorised: React.Dispatch<React.SetStateAction<boolean>>
]
 
const userCartDefault: UserAuthType = [false, () => { }]
export const RoleContext = createContext<UserAuthType>(userCartDefault)
export default function RoleContextProvider({ children }: { children: React.ReactNode }) {
    const [roleName, setRoleName] = useState<string>(rolesObj.USER)
    return (
        <RoleContext.Provider value={[roleName, setRoleName]}>
            {children}
        </RoleContext.Provider>

    )

}
