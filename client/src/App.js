import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Auth from './layouts/Auth/Auth';
import Home from './layouts/Main/Home';

import ErrorBoundary from './components/Shared/ErrorBoundary';

import authActions from './store/actions/authActions';
import { auth } from './store/selectors';

import { useTheme } from './hooks/useTheme';
import { useActions } from './hooks/useActions';

function App() {
  useTheme();

  const { isAuth } = useSelector(auth);
  const { getCurrentUser } = useActions(authActions);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getCurrentUser();
    }
  }, [getCurrentUser]);

  return (
    <ErrorBoundary>
      <div className="App">
        <Switch>
          <Route
            exact
            path={['/login', '/registration', '/verify']}
            render={() => (!isAuth ? <Auth /> : <Redirect to="/im" />)}
          />
          <Route path="/" render={() => (isAuth ? <Home /> : <Redirect to="/login" />)} />
          <Route path="*" render={() => <notFoundPage />} />
        </Switch>
      </div>
    </ErrorBoundary>
  );
}

export default App;
