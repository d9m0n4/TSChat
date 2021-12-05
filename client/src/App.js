import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth as AuthPage } from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import { useEffect } from 'react';

function App(props) {
  console.log(props);
  const { isAuth } = props;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(123);
    }
  });
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
