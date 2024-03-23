
import React from 'react';
import PrivateRoute from '../PrivateRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '@/components/NotFound';
import Login from '@/pages/Login';
import Index from '@/pages/Dashboard';
import Order from '@/pages/Order';
import Price from '@/pages/Price';
import Detail from '@/pages/Detail';
import Trading from '@/pages/Trading';
const BaseRouter = () => {
    return (
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute />} >
                    <Route path="index" element={<Index />} />
                    <Route path="order" element={<Order />} />
                    <Route path="trading" element={<Trading />} />
                    <Route path="detail" element={<Detail />} />
                    <Route path="price-list" element={<Price />} />
                </Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </Router>
    );

}

export default BaseRouter;
