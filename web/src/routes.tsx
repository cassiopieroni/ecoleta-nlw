import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import CreatPoint from './pages/CreatePoint';
import Points from './pages/Points';
import Point from './pages/Point';

const Routes = () => (
    <BrowserRouter> 
        <Route component={Home} path='/' exact />
        <Route component={CreatPoint} path='/create-point' />
        <Route component={Points} path='/points' exact/>
        <Route component={Point} path='/points/:id' exact/>
    </BrowserRouter>
);

export default Routes;