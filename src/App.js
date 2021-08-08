import React, { Component } from 'react';
import './styles/App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from './pages/List/List';
import Edit from "./pages/Edit/Edit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/persons' exact={true} component={List}/>
            <Route path='/persons/:id' component={Edit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;

//aws cloudformation create-stack --stack-name  demo --template-body file://cb.yml --capabilities CAPABILITY_NAMED_IAM