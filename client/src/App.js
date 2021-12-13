import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth as AuthPage } from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import { useEffect } from 'react';
import store from './store';
import authActions from './store/actions/authActions';

function App(props) {
  const { isAuth } = props;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.dispatch(authActions.getCurrentUser());
    }
  }, []);

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

export default connect(({ auth }) => ({ isAuth: auth.isAuth }))(App);
