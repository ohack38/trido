import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard'
import './App.css';

const App = () =>{
  return (
    <Router>
      <Fragment>
        <div className='container'>
             <Switch>
               <Route exact path='/' component={Dashboard}/>
             </Switch>
        </div>
      </Fragment>
    </Router>
      
    
  );
}

export default App;
