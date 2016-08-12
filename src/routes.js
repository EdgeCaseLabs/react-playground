import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';

import AltDataDemo from './components/AltDataDemo'
import TestPage from './components/TestPage'

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/test-page' component={TestPage} />
    <Route path='/alt-data-demo' component={AltDataDemo} />
    
  </Route>
);