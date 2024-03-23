import React from 'react';
import { Navigate } from 'react-router-dom';
import App from './App';
import { useEffect } from 'react';
import { connect } from 'react-redux';

const PrivateRoute = ({ token }) => {
    useEffect(() => {
        console.log("当前token信息：", token);
    }, [token]);

    return token ? (
        <App />
    ) : (
        <Navigate to="/login" replace />
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);