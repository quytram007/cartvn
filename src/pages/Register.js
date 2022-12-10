import '../styles/register.scss';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const [error, setError] = useState('');

    const handleChange = (input) => {
        setData({ ...data, [input.name]: input.value });
    };

    const hangdleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8000/api/users';
            const { data: res } = await axios.post(url, data);
            console.log(res.message);
        } catch (error) {
            if (error.response.status && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    return (
        <div className="login-register">
            <div className="login grid">
                <form onSubmit={hangdleOnSubmit}>
                    <div className="title"> Đăng Ký</div>
                    <div className="input fullname-label">
                        <input
                            className="fullname"
                            name="fullName"
                            value={data.fullName}
                            onChange={(e) => handleChange(e.currentTarget)}
                            placeholder="Nhập Họ Tên Của Bạn"
                        />
                    </div>
                    <div className="input email-label">
                        <input
                            className="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => handleChange(e.currentTarget)}
                            placeholder="Email/Số Điện Thoại/Tên Đăng Nhập"
                        />
                    </div>
                    <div className="input password-label">
                        <input
                            type="password"
                            className="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => handleChange(e.currentTarget)}
                            placeholder="Mật Khẩu"
                        />
                    </div>
                    <div className="input password-label">
                        <input
                            type="password"
                            className="password-again"
                            placeholder="Nhập Lại Mật Khẩu"
                            name="rePassword"
                            value={data.rePassword}
                            onChange={(e) => handleChange(e.currentTarget)}
                        />
                    </div>
                    {error && <div className="error-msg"> {error} !</div>}
                    <button className="btn-sign-in" type="submit">
                        Đăng Ký
                    </button>

                    <div className="forgot-password">
                        <div>Quên mật khẩu</div>
                        <div>Đăng nhập với SMS</div>
                    </div>
                    <div className="sign-up">
                        <span>Bạn đã có tài khoản CartVN? </span>
                        <Link to={'/login'} className="btn-sign-up">
                            Đăng Nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Register;
