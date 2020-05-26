import React from 'react';
import logo from './logo.svg';
import './App.css';
import TerminalWrapper from './terminal/terminal-wrapper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory
} from "react-router-dom";

function App() {
  // eslint-disable-next-line
  let history = useHistory();

  return (
    <Router>
        {/* El switch que sirve de router */}
        <Switch>
          <Route exact path="/">
            <TerminalWrapper/>
          </Route>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
    </Router>
  );


}

function NoMatch(){
  let location = useLocation();
  let history = useHistory();
  return (
    <div>
      <h3>
        Vete de aquí <code>{location.pathname}</code> <button onClick={() => history.push('/')}>Volver</button>
      </h3>
    </div>
  )
}

export default App;
