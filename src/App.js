import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './componenets/Home'
import BookView from './containers/BookView'
import Layout from './hoc/layout'


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/books/:id" exact component={BookView}/>

      </Switch>
    </Layout>
  );
}

export default App;
