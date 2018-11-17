import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './componenets/Home'
import Layout from './hoc/layout'


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Layout>
  );
}

export default App;
