import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Homepage from './pages/Homepage';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Homepage}/>
      </Switch>
    )
  }
}
