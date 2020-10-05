import React, { useState } from "react";

interface Context {
  userInfo: UserInfo;
  setUserInfo: (user: UserInfo) => void;
}

const defaultUser = {
  id: "",
  name: "",
  photos: [],
};

export const AppContext = React.createContext<Context>({
  userInfo: defaultUser,
  setUserInfo: () => {},
});

export const AppContextWrapper: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUser);

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
