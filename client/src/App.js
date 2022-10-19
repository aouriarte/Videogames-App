import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CardDetails from './components/CardDetails/CardDetails';

import './App.css';

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/home/:id' component={CardDetails} />
        </Switch>
      </div>
  );
}

export default App;
