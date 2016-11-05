import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import { Home, NoMatch } from './view';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('tom-container'))
