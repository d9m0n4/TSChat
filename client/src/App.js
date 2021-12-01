import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';

function App(props) {
  const { isAuth } = props;
  console.log(isAuth);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={['/login', '/registration']}
          render={() => (!isAuth ? <Auth /> : <Redirect to="/" />)}
        />
        <Route exact path="/" render={() => (isAuth ? <Home /> : <Redirect to="/login" />)} />
      </Switch>
    </div>
  );
}

export default connect(({ auth }) => ({ isAuth: auth.isAuth }))(App);
