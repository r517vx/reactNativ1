import React, {createContext, useState} from "react";

const TokenContext = createContext("");

const TokenProvider = ({children}) => {
    const [token, setToken] = useState(null);

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    );
};

export {TokenProvider, TokenContext};