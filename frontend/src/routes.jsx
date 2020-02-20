import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Homepage from './pages/Homepage';
import FilteredColleges from './pages/Homepage/components/FilteredColleges';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/streams/:stream_name' component={FilteredColleges}/>
      </Switch>
    )
  }
}
