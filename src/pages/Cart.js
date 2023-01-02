import { useEffect, useState } from 'react';
import '../styles/cart.scss';
import axios from 'axios';
import voucherIcon from '../assets/logo/coupon.png';
import { useNavigate } from 'react-router-dom';
const DEFAULT_CART = [
    {
        productImg: '',
        productName: '',
        productPrice: '',
        productQuantity: '',
        productTotal: '',
        sellerId: '',
        isChecked: false,
    },
];
const DEFAULT_BUY = {
    product: [],
    quantity: 0,
    total: 0,
    afterDiscount: 0,
    voucher: '',
    deliveryCost: '',
};
const DEFAULT_VOUCHER = [
    {
        code: '',
        discount: '',
    },
];
const Cart = () => {
    let navigate = useNavigate();
    const [cart, setCart] = useState(DEFAULT_CART);
    const [payment, setPayment] = useState(DEFAULT_BUY);
    const [listVoucher, setListVoucher] = useState(DEFAULT_VOUCHER);
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherChoice, setVoucerChoice] = useState({});
    const [deliveryCost, setDeliveryCost] = useState([]);
    const [isShowVoucher, setIsShowVoucher] = useState(false);
    useEffect(() => {
        try {
            const getProductCart = async () => {
                const data = {
                    token: localStorage.getItem('token'),
                };
                const url = 'http://localhost:8000/api/cart';
                const { data: res } = await axios.post(url, data);
                console.log(res);
                setCart(res.data);
            };
            getProductCart();
        } catch (error) {
            console.log(error);
        }
    }, []);
    const handleOnReduceQuantity = (product, index) => {
        const _product = {
            ...product,
            quantity: product.quantity - 1,
            productTotal: product.productPrice * (product.quantity - 1),
        };
        let _cart = [...cart];
        _cart.splice(index, 1, _product);
        setCart(_cart);
        if (product.isChecked === true) {
            let _paymentProduct = [...payment.product];
            _paymentProduct.map((child) => {
                if (child === product) {
                    child.quantity = child.quantity - 1;
                    child.productTotal = child.productTotal - child.productPrice;
                }
            });
            setPayment({
                ...payment,
                product: _paymentProduct,
                quantity: payment.quantity - 1,
                total: payment.total - product.productPrice,
            });
        }
    };
    const handleOnIncreseQuantity = (product, index) => {
        const _product = {
            ...product,
            quantity: product.quantity + 1,
            productTotal: product.productPrice * (product.quantity + 1),
        };
        let _cart = [...cart];
        _cart.splice(index, 1, _product);
        setCart(_cart);
        if (product.isChecked === true) {
            let _paymentProduct = [...payment.product];
            _paymentProduct.map((child) => {
                if (child === product) {
                    child.quantity = child.quantity + 1;
                    child.productTotal = child.productTotal + child.productPrice;
                }
            });
            setPayment({
                ...payment,
                product: _paymentProduct,
                quantity: payment.quantity + 1,
                total: payment.total + product.productPrice,
            });
        }
    };
    const handleOnChoiceProduct = (check, value) => {
        if (check) {
            let _cart = [...cart];
            _cart.map((childCart) => {
                if (childCart === value) {
                    childCart['isChecked'] = true;
                    setDeliveryCost([...deliveryCost, childCart.deliveryCost]);
                }
            });
            setCart(_cart);
            const product = [...payment.product, value];
            setPayment({
                ...payment,
                product: product,
                total: payment.total + value.productTotal,
                quantity: payment.quantity + value.quantity,
            });
        }
        if (!check) {
            let _cart = [...cart];
            _cart.map((childCart) => {
                if (childCart === value) {
                    childCart['isChecked'] = false;
                    setDeliveryCost(
                        deliveryCost.filter(
                            (value, index) =>
                                index !== deliveryCost.findIndex((value) => (value = childCart.deliveryCost)),
                        ),
                    );
                }
            });
            setCart(_cart);
            const product = payment.product.filter((pro) => pro !== value);
            setPayment({
                ...payment,
                product: product,
                total: payment.total - value.productTotal,
                quantity: payment.quantity - value.quantity,
            });
        }
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
                deliveryCost: deliveryCost - voucherChoice.discount,
                afterDiscount: payment.total,
            });
    };
    const handShowVoucher = () => {
        setIsShowVoucher(true);
        if (voucherChoice.discount !== 0) setPayment({ ...payment, total: payment.afterDiscount });
    };
    useEffect(() => {
        let _deliveryCost = [...new Set(deliveryCost)];
        let feeShip = 0;
        _deliveryCost.map((value) => (feeShip += value));
        setPayment({
            ...payment,
            deliveryCost: feeShip,
        });
    }, [deliveryCost]);

    return (
        <div className="cart grid">
            {cart.map((value, index) => (
                <div className="child-cart" key={index}>
                    <input type="checkbox" onChange={(e) => handleOnChoiceProduct(e.target.checked, value)}></input>
                    <img className="product-image" src={value.productImg}></img>
                    <div className="product-name">{value.productName}</div>
                    <div className="product-price">{(parseInt(value.productPrice) / 1000).toFixed(3)}</div>
                    <div className="up-down-amount">
                        {value.quantity > 1 ? (
                            <div
                                className="volumn"
                                onClick={() => {
                                    handleOnReduceQuantity(value, index);
                                }}
                            >
                                -
                            </div>
                        ) : (
                            <div className="volumn">-</div>
                        )}
                        <div className="amount-number">{value.quantity}</div>
                        <div
                            className="volumn"
                            onClick={() => {
                                handleOnIncreseQuantity(value, index);
                            }}
                        >
                            +
                        </div>
                    </div>
                    <div className="product-quantity">{value.productQuantity}</div>
                    <div className="product-total">{(parseInt(value.productTotal) / 1000).toFixed(3)}</div>
                </div>
            ))}
            <div className="payment grid">
                <div className="voucher">
                    <img className="voucher-icon" src={voucherIcon}></img>
                    <div className="title">Voucher</div>
                    <div className="choice-voucher" onClick={() => handShowVoucher()}>
                        Chọn Hoặc Nhập Mã
                    </div>
                </div>
                <div className="total-payment">
                    <div className="delivery-fee">
                        <i className="fa-solid fa-truck"></i>
                        <span>Phí Giao Hàng:</span>
                        <span>₫{(payment?.deliveryCost / 1000).toFixed(3)}</span>
                    </div>
                    <div>
                        <span className="title">Tổng thanh toán ({payment?.quantity}):</span>
                        <span className="total">₫{(payment?.total / 1000).toFixed(3)}</span>
                        <button className="button-buy" onClick={() => navigate('/payment', { state: payment })}>
                            Mua Hàng
                        </button>
                    </div>
                </div>
            </div>
            {isShowVoucher && (
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
export default Cart;
