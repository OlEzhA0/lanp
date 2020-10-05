import React, { useEffect, useContext } from "react";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./routes/routes";
import { AuthContext } from "./context/authContext";
import { AppContext } from "./context/appContext";
import { useQuery } from "react-apollo";
import { getUserQuery } from "./helpers/gqlQuery";

function App() {
  const { setUserInfo } = useContext(AppContext);
  const { login, logout, token, userId } = useAuth();
  const { data } = useQuery(getUserQuery, { variables: { id: userId } });
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    if (data && data.user) {
      const user = data.user;
      setUserInfo({
        id: user.id,
        name: user.name,
        photos: user.photos,
      });
    }
  }, [data, setUserInfo]);

  return (
    <AuthContext.Provider
      value={{ logout, login, token, userId, isAuthenticated }}
    >
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
