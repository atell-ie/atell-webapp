import React, { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ isScrollingPresent, children }) => {
    return (
        <UserContext.Provider value={{ isScrollingPresent }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
