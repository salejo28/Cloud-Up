import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/Forms/Login/Login'
import Register from './components/Forms/Register/Register';
import Profile from './components/profile/Profile'
import NavBar from './components/NavBar/NavBar';
import Dir from './components/Dir/Dir';

import './App.css'

import { isAuthenticate } from './auth/auth';
//console.log(isAuthenticate())

const PrivateRoute = (props) => {
    return isAuthenticate() ? <Route {...props} /> : <Redirect to="/login" />
}

const auth = isAuthenticate() ? true : false;
//console.log(auth)

const Logout = () => {
    localStorage.removeItem('token');
    return <Redirect to="/login" />
}

const App = () => {
    return (
        <Router>
            <NavBar auth={auth} />
            <Switch>
                <Route exact path="/" >
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/folders/:path?" render={(props) => <Dir key={props.match.params.path} {...props} />}  />
            </Switch>
        </Router>
    )
}

export default App;