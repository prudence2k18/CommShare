import { createContext, useState } from "react";

export const AppContext = createContext();
export function AppProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    firstname: "Mark",
    lastname: "David",
    email: "john@gmail.com",
    image: null,
  });
  const [estates, setEstates] = useState([]);
  const [estateGroups, setEstateGroups] = useState([]);
  const [createdEstates, setCreatedEstates] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [docID, setDocID] = useState("");
  const [userUID, setUserUID] = useState("Hp04HYLJPpUsE5fXQoiIg4o5mLz1");
  const [preloader, setPreloader] = useState(false);
  const [users, setUsers] = useState([]);

  return (
    <AppContext.Provider
      value={{
        docID,
        setDocID,
        userInfo,
        setUserInfo,
        estates,
        setEstates,
        estateGroups,
        setEstateGroups,
        userUID,
        setUserUID,
        preloader,
        setPreloader,
        communities,
        setCommunities,
        createdEstates,
        setCreatedEstates,
        users,
        setUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
