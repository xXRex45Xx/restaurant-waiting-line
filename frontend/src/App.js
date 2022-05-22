import { useState } from 'react';

import './App.css';
import LoginPage from './pages/login-page/login-page.page';
import UserPage from './pages/user-page/user-page.component.jsx';
import AdminPage from './pages/admin-page/admin-page.page.jsx';

function App() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [userId, setUserId] = useState(null);

  const onLogin = (userId, isAdmin) => {
    setUserId(userId);
    setIsAdmin(isAdmin);
  };
  
  return (
    <div className="App">
      {userId ? (isAdmin ? <AdminPage/> : <UserPage/>) :<LoginPage onLogin={onLogin} />}
    </div>
  );
}

export default App;
