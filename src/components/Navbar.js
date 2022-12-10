import '../styles/navbar.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [infoUser, setInfoUser] = useState({});
    useEffect(() => {
        const data = { token: localStorage.getItem('token') };

        try {
            const verify = async () => {
                const url = 'http://localhost:8000/api/verify';
                const { data: res } = await axios.post(url, data);
                console.log(res);
                setInfoUser({
                    fullName: res.data.fullName,
                    countProduct: res.countProduct,
                });
                setIsLogin(true);
            };
            verify();
        } catch (error) {}
    }, []);
    const handleOnLogOut = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    };
    return (
        <div className="navbar">
            <div className="grid">
                <div className="first-navbar">
                    <div className="first-navbar-left">
                        <div className="first-navbar-left-item">Kênh người bán</div>
                        <div className="first-navbar-left-item">Tải ứng dụng</div>
                        <div className="first-navbar-left-item">
                            Kết nối
                            <i class="fab fa-facebook"></i>
                            <i class="fab fa-google"></i>
                        </div>
                    </div>

                    <div className="first-navbar-right">
                        <div className="first-navbar-right-item">Thông báo</div>
                        <div className="first-navbar-right-item">Hỗ trợ</div>
                        <div className="first-navbar-right-item">Tiếng việt</div>
                        {isLogin === false ? (
                            <>
                                <Link to={'/register'} className="first-navbar-right-item">
                                    Đăng ký
                                </Link>
                                <Link to={'/login'} className="first-navbar-right-item">
                                    Đăng nhập{' '}
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="first-navbar-right-item info">{infoUser.fullName}</div>

                                <div className="notification">
                                    <div class="arrow-up"></div>
                                    <div className="square">
                                        <div className="my-account in-square">Tài Khoản Của Tôi</div>
                                        <div className="in-square">Đơn Mua</div>
                                        <div className="logout in-square" onClick={() => handleOnLogOut()}>
                                            Đăng Xuất
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="navbar-header">
                    <div className="logo"> </div>
                    <div className="navbar-search">
                        <input className="navbar-search-input"></input>
                        <div className="navbar-search-button">
                            <i className="fal fa-search"></i>
                        </div>
                    </div>
                    <div className="navbar-header-button-cart">
                        <i class="fal fa-shopping-cart"></i>
                        <div className="quantity-product-in-cart">{infoUser.countProduct}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
