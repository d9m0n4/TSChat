import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth as AuthPage } from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import { useEffect } from 'react';
import authActions from './store/actions/authActions';

function App({ isAuth, getCurrentUser }) {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getCurrentUser();
    }
  }, [getCurrentUser]);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={['/login', '/registration', '/verify']}
          render={() => (!isAuth ? <AuthPage /> : <Redirect to="/" />)}
        />
        <Route path="/" render={() => (isAuth ? <Home /> : <Redirect to="/login" />)} />
      </Switch>
    </div>
  );
}

export default connect(({ auth }) => ({ isAuth: auth.isAuth }), authActions)(App);
