import React from 'react';
import { Switch, Route } from 'react-router';
import Search from './pages/Search';

function App() {
  return (
    <Switch>
      <Route path="/" component={Search} />
    </Switch>
  );
}

export default App;
