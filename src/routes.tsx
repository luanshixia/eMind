import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Help from './components/Help';
import About from './components/About';

export const routes = (
<Layout>
  <Route exact path="/" component={Home} />
  <Route path="/help" component={Help} />
  <Route path="/about" component={About} />
</Layout>
);
