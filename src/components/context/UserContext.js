import React, { createContext } from 'react'
import useLocalStorage from '../../UseLocalStorage';

export const UserContext = createContext()



export const UserContextProvider= ({ children }) => {
    const [user, setUser] = useLocalStorage('user', {});
    
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}