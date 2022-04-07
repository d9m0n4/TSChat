import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Auth as AuthPage } from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import { useEffect } from 'react';
import authActions from './store/actions/authActions';
import { useTheme } from './hooks/useTheme';
import { auth } from './store/selectors';

import { isAuth as d } from './store/selectors';
import { useActions } from './hooks/useActions';

function App() {
  const { theme, setTheme } = useTheme();

  const { isAuth } = useSelector(auth);
  const { getCurrentUser } = useActions(authActions);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getCurrentUser();
    }
  }, [getCurrentUser]);

  const s = useSelector(d);

  useEffect(() => {
    console.log(s);
  });

  return (
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
  );
}

export default App;
