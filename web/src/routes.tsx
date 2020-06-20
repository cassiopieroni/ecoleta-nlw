import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';


import Home from './pages/Home';
import CreatPoint from './pages/CreatePoint';
import Points from './pages/Points';
import Point from './pages/Point';
import NotFoundPage from './pages/NotFoundPage';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route component={ Home } path='/' exact />
            <Route component={ CreatPoint } path='/create-point' />
            <Route component={ Points } path='/points' exact/>
            <Route component={ Point } path='/points/:id'/>
            <Route component={ NotFoundPage } />
        </Switch>
    </BrowserRouter>
);

export default Routes;