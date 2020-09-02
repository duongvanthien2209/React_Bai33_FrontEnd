import React, { useState } from 'react';

export const LoginContext = React.createContext();

export default function LoginProvider({ children }) {
    let [isLogin, setLogin] = useState(false);
    let [user, setUser] = useState(null);
    
    return (
        <div>
            <LoginContext.Provider value={{isLogin, setLogin, user, setUser}}>
                {
                    children
                }
            </LoginContext.Provider>
        </div>
    );
}
