import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/payment.scss';
import axios from 'axios';
import voucherIcon from '../assets/logo/coupon.png';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import refreshComponent from '../components/RefreshComponent';
const DEFAULT = {
    name: 'Trương Thành Quý',
    phoneNumber: '0335551118',
    address: 'Trường Việt Hàn, 430 Trần Đại Nghĩa, Phường Hòa Quý, Quận Ngũ Hành Sơn, Đà Nẵng',
    product: [
        {
            productImg: 'https://cf.shopee.vn/file/b50598fbfb0acea2911ca9eb9f2aa26e',
            productName: 'Áo Khoác Bomber Teddy Trắng - Áo Khoác Bomber Cầu Vai Da Chất Dạ Cực Dày Siêu Hot',
            productId: '6392eadd2f2512689e5314cc',
            productPrice: 90000,
            productColor: 'Đỏ',
            productSize: 'Xl',
            quantity: 2,
            productTotal: 180000,
            isChecked: true,
        },
    ],
    voucher: '',
    moneyTotal: '',
    ship: '',
    paymentTotal: '',
};
const DEFAULT_VOUCHER = [
    {
        code: '',
        discount: '',
    },
];
const Payment = () => {
    const { setRefresh } = useContext(refreshComponent);
    const { state } = useLocation();
    const [isShowVoucher, setIsShowVoucher] = useState(false);
    const [payment, setPayment] = useState(state);
    const [isShowChangeAddress, setIsShowChangeAddress] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');
    const [listVoucher, setListVoucher] = useState(DEFAULT_VOUCHER);
    const [voucherChoice, setVoucerChoice] = useState({});
    const [isShowPayPal, setIsShowPayPal] = useState(false);
    const [inputAddress, setInputAddress] = useState({
        name: '',
        phoneNumber: '',
        address: '',
    });
    useEffect(() => {
        (async () => {
            const data = {
                token: localStorage.getItem('token'),
            };
            try {
                const url = 'http://localhost:8000/api/payment';
                const { data: res } = await axios.post(url, data);
                console.log(res);
                setPayment({
                    ...payment,
                    name: res.name,
                    phoneNumber: res.phoneNumber,
                    address: res.address,
                    total: payment.total + payment.deliveryCost,
                    payAlready: false,
                });
            } catch (error) {}
        })();
    }, []);
    const handleOnChangeAddress = async () => {
        setIsShowChangeAddress(!isShowChangeAddress);
        try {
            const url = 'http://localhost:8000/api/payment/changeaddress';
            const data = {
                token: localStorage.getItem('token'),
                newAddress: inputAddress.address,
                product: payment.product,
            };
            const { data: res } = await axios.post(url, data);
            let listDelivery = [];
            res._product.map((value) => {
                listDelivery = [...listDelivery, value.deliveryCost];
            });
            const _listDelivery = [...new Set(listDelivery)];
            let feeShip = 0;
            _listDelivery.map((value) => (feeShip += value));
            feeShip < 20000 && (feeShip = 20000);
            setPayment({
                ...payment,
                name: inputAddress.name,
                address: inputAddress.address,
                phoneNumber: inputAddress.phoneNumber,
                product: res._product,
                deliveryCost: feeShip,
            });
        } catch (error) {}
    };
    const handleOnApplyVoucher = () => {
        try {
            const getVoucher = async () => {
                const data = {
                    code: voucherCode,
                };
                const url = 'http://localhost:8000/api/cart/voucher';
                const { data: res } = await axios.post(url, data);
                console.log(res);
                setListVoucher(res.data);
            };
            getVoucher();
        } catch (error) {
            console.log(error);
        }
    };
    const handleOnApply = () => {
        setIsShowVoucher(false);
        voucherChoice.type === 'discount' &&
            setPayment({
                ...payment,
                total: payment.total - (payment.total * voucherChoice.discount) / 100,
                afterDiscount: payment.total,
            });
        voucherChoice.type === 'freeship' &&
            setPayment({
                ...payment,
                deliveryCost: payment.deliveryCost - voucherChoice.discount,
                total: payment.total - voucherChoice.discount,
                afterDiscount: payment.total,
            });
    };
    useEffect(() => {
        try {
            const getVoucher = async () => {
                const url = 'http://localhost:8000/api/cart/voucher';
                const { data: res } = await axios.post(url);
                setListVoucher(res.data);
            };
            getVoucher();
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        setPayment({ ...payment, total: payment.total + payment.deliveryCost });
    }, [payment.product]);
    let navigate = useNavigate();
    const handleOnFinish = async () => {
        try {
            const url = 'http://localhost:8000/api/payment/finish';
            const data = {
                token: localStorage.getItem('token'),
                payment,
            };
            navigate('/');
            setRefresh(Math.random());
            const { data: res } = await axios.post(url, data);
        } catch (error) {}
    };
    return (
        <div className="last-payment grid">
            <div className="address">
                <div className="title">
                    <i className="fas fa-map-marker-alt"></i>
                    Địa Chỉ Nhận Hàng
                </div>
                {isShowChangeAddress === false ? (
                    <div className="content">
                        <div className="name-number-phone">
                            {payment.name} {payment.phoneNumber}
                        </div>
                        <div className="user-address">{payment.address}</div>
                        <div
                            className="btn-change-address"
                            onClick={() => setIsShowChangeAddress(!isShowChangeAddress)}
                        >
                            Thay Đổi
                        </div>
                    </div>
                ) : (
                    <div className="content">
                        <div className="name-number-phone">
                            <input
                                className="input-name"
                                value={inputAddress.name}
                                onChange={(e) => setInputAddress({ ...inputAddress, name: e.target.value })}
                                placeholder="Họ tên người nhận"
                            />
                            <input
                                className="input-phone-number"
                                value={inputAddress.phoneNumber}
                                onChange={(e) => setInputAddress({ ...inputAddress, phoneNumber: e.target.value })}
                                placeholder="Số điện thoại người nhận"
                            />
                        </div>
                        <input
                            className="input-user-address"
                            value={inputAddress.address}
                            onChange={(e) => setInputAddress({ ...inputAddress, address: e.target.value })}
                            placeholder="Địa chỉ người nhận"
                        />
                        <div className="btn-change-address" onClick={() => handleOnChangeAddress()}>
                            Xác Nhận
                        </div>
                    </div>
                )}
            </div>

            <div className="payment-product">
                <div className="title">
                    <div className="left">Sản Phẩm</div>
                    <div className="right">
                        <div className="right-title">Đơn Giá</div>
                        <div className="right-title">Số Lượng</div>
                        <div className="right-title">Thành Tiền</div>
                    </div>
                </div>
                <div className="list-product">
                    {payment.product.map((value, index) => (
                        <div key={index} className="payment-child-product">
                            <img src={value.productImg} />
                            <div className="payment-child-product-name">{value.productName}</div>
                            <div className="payment-child-product-more">{value.productPrice}</div>
                            <div className="payment-child-product-more middle">{value.quantity}</div>
                            <div className="payment-child-product-more">{value.productTotal}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="voucher-in-payment">
                <div className="voucher-title">
                    <img className="voucher-icon" src={voucherIcon}></img>
                    Voucher
                </div>
                <div className="action" onClick={() => setIsShowVoucher(true)}>
                    Chọn Voucher{' '}
                </div>
            </div>
            <div className="payment-methods">
                <div className="payment-methods-title">Phương Thức Thanh Toán</div>
                <div onClick={() => setIsShowPayPal(true)}>Thanh Toán Bằng PayPal</div>
                {isShowPayPal === true && (
                    <div>
                        {payment.payAlready === false ? (
                            <div>
                                <PayPalScriptProvider
                                    options={{
                                        'client-id':
                                            'AaNQ4WZ2aDxMFX-7Hj1ZVbgKh8J0TOpnSw2my4Wanan_5DHZyNOkif82BbN0HmhBH7LiHlUZ5cWyIlPG',
                                    }}
                                >
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: `${(payment.total * 0.000042).toFixed(2)}`,
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                const name = details.payer.name.given_name;
                                                setPayment({ ...payment, payAlready: true });
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        ) : (
                            <div>Đã Thanh Toán Thành Công</div>
                        )}
                    </div>
                )}

                {isShowPayPal === false && <div>Thanh Toán Khi Nhận Hàng</div>}
            </div>
            <div className="last-check">
                <div>
                    <div className="last-check-child">
                        <span>Tổng Tiền hàng :</span>
                        <span>₫{((payment.total - payment.deliveryCost) / 1000).toFixed(3)}</span>
                    </div>
                    <div className="last-check-child">
                        <span>Phí Giao Hàng :</span>
                        <span>₫{(payment.deliveryCost / 1000).toFixed(3)}</span>
                    </div>
                    <div className="last-check-child">
                        <span>Tổng Tiền Thanh Toán :</span>
                        <span className="total">₫{(payment.total / 1000).toFixed(3)}</span>
                    </div>
                    <div className="last-check-child last">
                        <button className="btn" onClick={() => handleOnFinish()}>
                            Đặt Hàng
                        </button>
                    </div>
                </div>
            </div>
            {isShowVoucher && isShowVoucher === true && (
                <div className="voucher-page">
                    <div className="voucher">
                        <div className="header-voucher">
                            <div className="input-code">
                                <span className="title">Mã Voucher</span>
                                <input
                                    className="voucher-code"
                                    value={voucherCode}
                                    onChange={(e) => setVoucherCode(e.target.value)}
                                ></input>
                                <button className="voucher-button" onClick={() => handleOnApplyVoucher()}>
                                    Áp Dụng
                                </button>
                            </div>
                        </div>
                        <div className="list-voucher">
                            <div className="voucher-freeship">
                                {listVoucher.map(
                                    (voucher, index) =>
                                        voucher &&
                                        voucher.type === 'freeship' && (
                                            <div
                                                className="child-voucher"
                                                key={index}
                                                onClick={() => setVoucerChoice(voucher)}
                                            >
                                                <div className="img">
                                                    <i className="fa-solid fa-truck"></i>
                                                    <div className="title">Miễn Phí Vận Chuyển</div>
                                                </div>
                                                <div className="decripstion">
                                                    Bạn sẽ được giảm {(voucher.discount / 1000).toFixed(3)} phí vận
                                                    chuyển
                                                </div>
                                                <input
                                                    type={'radio'}
                                                    checked={voucher === voucherChoice ? true : false}
                                                ></input>
                                            </div>
                                        ),
                                )}
                            </div>
                            <div className="voucher-discount">
                                {listVoucher.map(
                                    (voucher, index) =>
                                        voucher &&
                                        voucher.type === 'discount' && (
                                            <div
                                                className="child-voucher"
                                                key={index}
                                                onClick={() => setVoucerChoice(voucher)}
                                            >
                                                <div className="img">
                                                    <i className="fa-solid fa-percent"></i>
                                                    <div className="title">Giảm Giá Trực Tiếp</div>
                                                </div>
                                                <div className="decripstion">
                                                    Bạn sẽ được giảm {voucher.discount}% trực tiếp vào đơn hàng
                                                </div>
                                                <input
                                                    type={'radio'}
                                                    checked={voucher === voucherChoice ? true : false}
                                                ></input>
                                            </div>
                                        ),
                                )}
                            </div>
                        </div>
                        <div className="footer-voucher">
                            <button className="back" onClick={() => setIsShowVoucher(false)}>
                                Trở Lại
                            </button>
                            <button className="ok" onClick={() => handleOnApply()}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Payment;
