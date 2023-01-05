import React from 'react';
import { useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);

    const [error, setError] = useState('');
    const handleChange = (input) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8000/api/auth';
            const { data: res } = await axios.post(url, data);
            localStorage.setItem('token', res.data);
            window.location = '/';
            setError('');
            setShowAlert(true);
        } catch (error) {
            if (error.response.status && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    return (
        <div className="login-register">
            <div className="login grid">
                <form onSubmit={handleOnSubmit}>
                    <div className="title"> Đăng Nhập</div>
                    <div className="input email-label">
                        <input
                            className="email"
                            placeholder="Email/Số Điện Thoại/Tên Đăng Nhập"
                            name="email"
                            value={data.email}
                            onChange={(e) => handleChange(e.currentTarget)}
                        />
                    </div>
                    <div className="input password-label">
                        <input
                            className="password"
                            placeholder="Mật Khẩu"
                            name="password"
                            value={data.password}
                            onChange={(e) => handleChange(e.currentTarget)}
                        />
                    </div>
                    {error && <div className="error-msg"> {error} !</div>}
                    <button className="btn-sign-in" type="submit">
                        Đăng Nhập
                    </button>
                    <div className="forgot-password">
                        <div>Quên mật khẩu</div>
                        <div>Đăng nhập với SMS</div>
                    </div>
                    <div className="sign-up">
                        <span>Bạn mới biết đến CartVN? </span>
                        <Link to="/register" className="btn-sign-up">
                            Đăng ký
                        </Link>
                        {showAlert === false && (
                            <Snackbar open={showAlert} autoHideDuration={2000}>
                                <Alert severity="success" sx={{ width: '100%' }}>
                                    This is a success message!
                                </Alert>
                            </Snackbar>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
