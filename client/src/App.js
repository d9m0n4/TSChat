import { Switch, Route } from 'react-router-dom';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">{Auth}</Route>
      </Switch>
    </div>
  );
}

export default App;
