import '../styles/navbar.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import logo from '../assets/logo/logoCartVn.png';
import refreshComponent from './RefreshComponent';
import _ from 'lodash';

const Navbar = () => {
    const { refresh, setSearch, search } = useContext(refreshComponent);
    const [isLogin, setIsLogin] = useState(false);
    const [infoUser, setInfoUser] = useState({
        product: [],
    });
    const [inputSearch, setInputSearch] = useState(search);
    console.log(refresh);
    useEffect(() => {
        setTimeout(() => {
            const data = { token: localStorage.getItem('token') };
            try {
                if (data.token !== null) {
                    console.log(data);
                    const verify = async () => {
                        const url = 'http://localhost:8000/api/verify';
                        const { data: res } = await axios.post(url, data);
                        console.log(res);
                        setInfoUser({
                            fullName: res.data.fullName,
                            avatar: res.data.avatar,
                            product: res.product,
                        });
                        setIsLogin(true);
                    };
                    verify();
                } else {
                    console.log('đã đăng xuất');
                    setIsLogin(false);
                    setInfoUser({});
                }
            } catch (error) {}
        }, 1000);
    }, [refresh]);
    const handleOnLogOut = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
        setInfoUser({});
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
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-google"></i>
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
                                <div className="first-navbar-right-item info">
                                    {infoUser.avatar ? (
                                        <img src={infoUser.avatar.url} />
                                    ) : (
                                        <i className="fa-solid fa-circle-user"></i>
                                    )}
                                    {infoUser.fullName}
                                </div>

                                <div className="notification">
                                    <div className="arrow-up"></div>
                                    <div className="square">
                                        <Link to={'/user'} style={{ textDecoration: 'none', color: '#000' }}>
                                            <div className="my-account in-square">Tài Khoản Của Tôi</div>
                                        </Link>
                                        <div className="in-square">Đơn Mua</div>
                                        <Link to={'/'} style={{ textDecoration: 'none', color: '#000' }}>
                                            <div className="logout in-square" onClick={() => handleOnLogOut()}>
                                                Đăng Xuất
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="navbar-header">
                    <Link to={'/'} className="logo">
                        <img src={logo}></img>
                    </Link>
                    <div className="navbar-search">
                        <input
                            className="navbar-search-input"
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                        ></input>
                        <div className="navbar-search-button" onClick={() => setSearch(inputSearch)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                    <div className="navbar-header-button-cart">
                        <Link to={'/cart'}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                        {infoUser.product && infoUser.product.length > 0 && (
                            <>
                                <div className="quantity-product-in-cart">{infoUser.product.length}</div>
                                <div className="review-cart">
                                    <div className="arrow-up">{}</div>
                                    <div className="square">
                                        {infoUser.product &&
                                            infoUser.product.map((value, index) => {
                                                if (index < 5)
                                                    return (
                                                        <div className="product-review-cart" key={index}>
                                                            <img src={value.productImg}></img>
                                                            <div className="text">{value.productName}</div>
                                                            <div className="price">₫{value.productPrice}</div>
                                                        </div>
                                                    );
                                            })}
                                        <div className="footer-review-cart">
                                            <div className="quantity-review-cart">
                                                {infoUser.product.length} Sản Phẩm Trong Giỏ Hàng
                                            </div>
                                            <Link to={'/cart'}>
                                                <button className="enter-cart">Xem Giỏ Hàng</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
