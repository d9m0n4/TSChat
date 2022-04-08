import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Auth as AuthPage } from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';

import Loader from './components/Loader';

import authActions from './store/actions/authActions';
import { auth } from './store/selectors';

import { useTheme } from './hooks/useTheme';
import { useActions } from './hooks/useActions';

function App() {
  const { theme, setTheme } = useTheme();

  const { isAuth, user } = useSelector(auth);
  const { getCurrentUser } = useActions(authActions);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getCurrentUser();
    }
  }, [getCurrentUser]);

  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <div className="App">
          <Switch>
            <Route
              exact
              path={['/login', '/registration', '/verify']}
              render={() => (!isAuth ? <AuthPage /> : <Redirect to="/im" />)}
            />
            <Route path="/" render={() => (isAuth ? <Home /> : <Redirect to="/login" />)} />
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
