import { createContext, useState } from "react";


export const AppContext = createContext();
export function AppProvider({ children }) {
    const [userInfo, setUserInfo] = useState({ firstname: "Mark", lastname: "David", email: "john@gmail.com", image: null });
    const [estates, setEstates] = useState([]);
    const [estateGroups, setEstateGroups] = useState([]);
    const [userUID, setUserUID] = useState("42DS64GJG86GG9SFH8SN0G");

    return (
        <AppContext.Provider value={{
            userInfo, setUserInfo,
            estates, setEstates,
            estateGroups, setEstateGroups,
            userUID, setUserUID,
        }}>
            {children}
        </AppContext.Provider>
    );

}