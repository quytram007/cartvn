import '../styles/profile.scss';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
const DEFAULT = {
    fullName: '',
    name: '',
    phoneNumber: '',
    gender: '',
    birthday: '',
    address: '',
};
const Profile = () => {
    const handleChoiceAvatar = useRef();
    const [userProfile, setUserProfile] = useState(DEFAULT);
    const handleChangeAvatar = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setUserProfile({ ...userProfile, avatar: reader.result });
        };
    };
    const handleOnSave = async () => {
        try {
            const url = 'http://localhost:8000/api/users/update';
            const token = localStorage.getItem('token');
            const data = {
                token,
                userProfile,
            };
            const { data: res } = await axios.post(url, data);
            console.log(res.message);
        } catch (error) {
            // if (error.response.status && error.response.status >= 400 && error.response.status <= 500) {
            //     setError(error.response.data.message);
            // }
        }
    };
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
        <div className="profile">
            <div className="header">
                <div className="title">Hồ Sơ Của Tôi</div>
                <div className="content">Quản lý thông tin hồ sơ tài khoản</div>
            </div>
            <div className="main">
                <div className="form">
                    <div className="user-name user-form">
                        <label className="lable">Tên Đăng nhập</label>
                        <div className="content">{userProfile.fullName}</div>
                    </div>
                    <div className="name user-form">
                        <label className="lable">Họ Tên</label>
                        <input
                            value={userProfile.name}
                            className="content"
                            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        ></input>
                    </div>
                    <div className="phone-number user-form">
                        <label className="lable">Số Điện Thoại</label>
                        <div className="content">{userProfile.phoneNumber}</div>
                    </div>
                    <div className="sex user-form">
                        <label className="lable">Giới Tính</label>
                        <div className="content">
                            <input
                                type="radio"
                                name="sex"
                                value="Nam"
                                checked={userProfile.gender === 'Nam'}
                                onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                            />
                              <label for="html">Nam</label>
                             
                            <input
                                type="radio"
                                name="sex"
                                value="Nữ"
                                checked={userProfile.gender === 'Nữ'}
                                onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                            />
                             <label for="css">Nữ</label>
                             
                            <input
                                type="radio"
                                name="sex"
                                value="Khác"
                                checked={userProfile.gender === 'Khác'}
                                onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                            />
                             <label for="javascript">Khác</label>
                        </div>
                    </div>
                    <div className="address user-form">
                        <label className="lable">Địa Chỉ</label>
                        <input
                            value={userProfile.address}
                            className="content"
                            onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                        ></input>
                    </div>
                    <div className="birth-day user-form">
                        <label className="lable">Ngày Sinh</label>
                        <input
                            value={userProfile.birthday}
                            className="content"
                            type={'date'}
                            onChange={(e) => setUserProfile({ ...userProfile, birthday: e.target.value })}
                        ></input>
                    </div>
                    <div className="user-form">
                        <button className="button-save" onClick={() => handleOnSave()}>
                            Lưu
                        </button>
                    </div>
                </div>
                <div className="choice-avatar">
                    <div className="avatar">
                        {userProfile.avatar ? (
                            <img src={userProfile.avatar.url || userProfile.avatar} />
                        ) : (
                            <i className="fas fa-user-circle"></i>
                        )}
                    </div>
                    <input
                        type={'file'}
                        style={{ display: 'none' }}
                        ref={handleChoiceAvatar}
                        onChange={(e) => handleChangeAvatar(e)}
                    ></input>
                    <button onClick={() => handleChoiceAvatar.current.click()}>Chọn Ảnh</button>
                </div>
            </div>
        </div>
    );
};
export default Profile;
