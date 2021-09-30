import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/login';
import Main from './pages/main';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/main">
          <Main />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
