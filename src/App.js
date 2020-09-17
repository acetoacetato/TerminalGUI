import React from 'react';
import './App.css';
import TerminalWrapper from './terminal/terminal-wrapper';
import PermanentDrawerLeft from './Sidebar';
import 'fontsource-roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
          <PermanentDrawerLeft/>
          
            
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
