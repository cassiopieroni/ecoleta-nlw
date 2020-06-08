import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import CreatPoint from './pages/CreatePoint';
import Points from './pages/Points';

const Routes = () => (
    <BrowserRouter> 
        <Route component={Home} path='/' exact />
        <Route component={CreatPoint} path='/create-point' />
        <Route component={Points} path='/points' />
    </BrowserRouter>
);

export default Routes;