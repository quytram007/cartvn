import '../styles/userinfo.scss';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Profile from '../components/Profile';
import Product from '../components/Product';
const DEFAULT = {
    fullName: '',
    name: '',
    phoneNumber: '',
    gender: '',
    birthday: '',
    address: '',
};

const UserInfo = () => {
    const [component, setComponent] = useState('Profile');
    const [userProfile, setUserProfile] = useState(DEFAULT);
    useEffect(() => {
        try {
            const getUserInfo = async () => {
                const url = 'http://localhost:8000/api/auth/profile';
                const token = localStorage.getItem('token');
                const data = {
                    token,
                };
                const { data: res } = await axios.post(url, data);
                setUserProfile(res.data);
            };
            getUserInfo();
        } catch (error) {
            // if (error.response.status && error.response.status >= 400 && error.response.status <= 500) {
            //     setError(error.response.data.message);
            // }
        }
    }, []);
    return (
        <div className="user">
            <div className="user-navbar">
                <div className="header">
                    {userProfile.avatar ? <img src={userProfile.avatar.url} /> : <i className="fas fa-user-circle"></i>}
                    <div className="user-name">{userProfile.fullName}</div>
                </div>
                <div className="content">
                    <div
                        className="child"
                        onClick={() => {
                            setComponent('Profile');
                        }}
                    >
                        <i className="far fa-user"></i>
                        Tài Khoản Của Tôi
                    </div>
                    <div
                        className="child"
                        onClick={() => {
                            setComponent('Product');
                        }}
                    >
                        <i className="far fa-box"></i>
                        Sản Phẩm Của Tôi
                    </div>
                    <div className="child">
                        <i className="far fa-clipboard-list-check"></i>
                        Đơn Hàng Đã Mua
                    </div>
                </div>
            </div>
            {component === 'Profile' ? <Profile /> : component === 'Product' ? <Product /> : <div></div>}
        </div>
    );
};
export default UserInfo;
