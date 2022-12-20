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
        phoneNumber: '',
    });
    const [isVerifyPhone, setisVerifyPhone] = useState(false);

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
            setisVerifyPhone(true);
        } catch (error) {
            if (error.response.status && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    const handleOnVerify = async () => {
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
                {!isVerifyPhone ? (
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
                                placeholder="Email"
                            />
                        </div>
                        <div className="input phone-lable">
                            <input
                                className="phoneNumber"
                                name="phoneNumber"
                                value={data.phoneNumber}
                                onChange={(e) => handleChange(e.currentTarget)}
                                placeholder="Số điện thoại"
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
                ) : (
                    <div className="verify">
                        <div className="title">Xác Thực Số Điện Thoại</div>
                        <div className="content">
                            Chúng tôi đã gửi mã xác nhận vào số điện thoại của bạn. Vui lòng kiểm tra tin nhắn vào điền
                            mã xác thực đó vào ô bên dưới
                        </div>
                        <div className="input-code">
                            <input
                                value={data.code}
                                onChange={(e) => setData({ ...data, code: e.target.value })}
                            ></input>
                            <button onClick={() => handleOnVerify()}>Xác Thực</button>
                        </div>
                        <div className="send-again">
                            <span className="content">Bạn không nhận được mã </span>
                            <span className="send">Gửi Lại</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Register;
