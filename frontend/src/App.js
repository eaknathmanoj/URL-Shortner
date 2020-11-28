import './Styles/App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={['/']} component={HomePage}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
