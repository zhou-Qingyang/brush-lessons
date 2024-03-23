import React, { useState } from 'react';
import { UserLogin } from '@/api/user.js';
import "./index.scss";
import { message } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@/store/actions.js';
const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await UserLogin({ username, password });
        if (response.code === 200) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate("/index")
            message.success("登录成功")
        } else if (response.code === 401) {
            message.error('用户名或密码错误');
        }
    };
    return (
        <div className="container">
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h2>登录</h2>
                    <div className="input-box">
                        <span className="icon"><i className="fa-solid fa-envelope"></i></span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Username"
                        />
                    </div>
                    <div className="input-box">
                        <span className="icon"><i className="fa-solid fa-lock"></i></span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit">登录</button>
                </form>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch(setToken(token)),
    };
};
export default connect(null, mapDispatchToProps)(Login);