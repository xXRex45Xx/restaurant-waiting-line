import React, { useState, Fragment, useEffect } from 'react';

import LoginPage from './pages/login-page/login-page.page';
import UserPage from './pages/user-page/user-page.component.jsx';
import AdminPage from './pages/admin-page/admin-page.page.jsx';
import LogoutContext from './store/logout.context';

function App() {
  const [loggedInUser, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLoggedInUser = async () => {
    setIsLoading(true);
    const userData = await (await fetch("/api/currentuser", {
      credentials: "include"
    }))
      .json();
    if (userData.success)
      setUser(userData.user)
    setIsLoading(false);
  }

  useEffect(() => {
    getLoggedInUser();
  }, [])

  const loginHandler = (user) => {
    setUser(user);
  };

  const logoutHandler = () => {
    fetch("/api/logout",{credentials: "include"})
      .then(response => response.json())
      .then(data => {
          return setUser(null);
      })
      .catch(error => console.log(error));
  };

  return (
    <Fragment>
      {isLoading ? <LoginPage>Loading...</LoginPage> :
        !loggedInUser ?
          <LoginPage onLogin={loginHandler} /> :
          <LogoutContext.Provider
            value={{
              onLogout: logoutHandler
            }}
          >
            {loggedInUser.isAdmin ?
              <AdminPage /> :
              <UserPage />}
          </LogoutContext.Provider>
      }
    </Fragment>
  );
}

export default App;
