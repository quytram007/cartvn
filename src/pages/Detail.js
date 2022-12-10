import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detail.scss';
import axios from 'axios';

const DEFAULT = {
    id: '01',
    name: 'Áo Khoác Bomber Teddy Trắng - Áo Khoác Bomber Cầu Vai Da Chất Dạ Cực Dày Siêu Hot',
    price: '24.000 - 120.000',
    sale: '30%',
    photo: [
        { image: 'https://cf.shopee.vn/file/b50598fbfb0acea2911ca9eb9f2aa26e' },
        { image: 'https://cf.shopee.vn/file/b50598fbfb0acea2911ca9eb9f2aa26e' },
        { image: 'https://cf.shopee.vn/file/b50598fbfb0acea2911ca9eb9f2aa26e' },
        { image: 'https://cf.shopee.vn/file/b50598fbfb0acea2911ca9eb9f2aa26e' },
        { image: 'https://cf.shopee.vn/file/b50598fbfb0acea2911ca9eb9f2aa26e' },
    ],
    color: ['Xanh', 'Vang', 'Do'],
    size: ['Xanh', 'Vang', 'Do'],
    like: false,
};
const BUY_DEFAULT = {
    productId: '',
    productPrice: '',
    productColor: '',
    productSize: '',
    quantity: 1,
};

const Detail = () => {
    const [productDetail, setProductDetail] = useState(DEFAULT);

    const productId = useParams().id;

    const [productBuy, setProductBuy] = useState(BUY_DEFAULT);
    useEffect(() => {
        try {
            const getProductDetail = async () => {
                const url = `http://localhost:8000/api/product/${productId}`;
                const { data: res } = await axios.get(url);
                console.log(res.data);
                setProductDetail(res.data);
            };
            getProductDetail();
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        const productPrice = productDetail.price - (productDetail.price * productDetail.sale) / 100;
        setProductBuy({ ...productBuy, productPrice: productPrice, productId: productId });
    }, [productDetail]);
    // try {
    //     const abc = async () => {
    //         const url = `http://localhost:8000/api/product/${id}`;
    //         const { data: res } = await axios.get(url);
    //     };
    //     abc();
    // } catch (error) {}
    const handleOnAddToCart = () => {
        try {
            const addToCart = async () => {
                const data = {
                    token: localStorage.getItem('token'),
                    dataBuy: productBuy,
                };
                const url = 'http://localhost:8000/api/cart';
                const { data: res } = await axios.post(url, data);
            };
            addToCart();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="detail grid">
            <div className="img-detail">
                <img className="img-detail-photo" src={productDetail.photo[0].image}></img>
                <div className="all-image">
                    {productDetail.photo.map((value) => {
                        return <img className="mini-image-detail" src={value.image}></img>;
                    })}
                </div>
            </div>
            <div className="infomation-detail">
                <div className="name-detail genera-detail">{productDetail.name}</div>
                <div className="price-detail genera-detail">
                    <span>
                        <span className="currency">₫</span>
                        <span className="price-not-sale">{(productDetail.price / 1000).toFixed(3)}</span>
                    </span>
                    <span className="currency-primary">₫ </span>
                    {((productDetail.price - (productDetail.price * productDetail.sale) / 100) / 1000).toFixed(3)}
                </div>
                <div className="saleoff genera-detail">
                    <div className="left abc">Mã Giảm Giá Của Shop</div>
                    <div className="right">Giảm {productDetail.sale}%</div>
                </div>
                <div className="logistic genera-detail">
                    <div className="left">Vận Chuyển</div>
                    <div className="logistic-right right">
                        <div className="logistic-address ">
                            <div className="right-left">Vận Chuyển Tới</div>
                            <div className="address">Phường Hoà Quý - Ngũ Hàng Sơn</div>
                        </div>
                        <div className="logistic-fee ">
                            <div className="right-left">Phí Vận Chuyển</div>
                            <div className="fee">23.000</div>
                        </div>
                    </div>
                </div>
                <div className="color-detail genera-detail">
                    <div className="left">Màu Sắc</div>
                    <div className="right">
                        {productDetail.color.map((value, index) => (
                            <button
                                key={index}
                                className={productBuy.productColor === value ? 'btn-color-choice' : 'btn-color'}
                                onClick={() => setProductBuy({ ...productBuy, productColor: value })}
                            >
                                {value}
                                {productBuy.productColor === value && (
                                    <>
                                        <div className="tick-mark"></div>
                                        <i class="far fa-check"></i>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="size-detail genera-detail">
                    <div className="left">Size</div>
                    <div className="right">
                        {productDetail.size.map((value, index) => (
                            <button
                                key={index}
                                className={productBuy.productSize === value ? 'btn-color-choice' : 'btn-color'}
                                onClick={() => setProductBuy({ ...productBuy, productSize: value })}
                            >
                                {value}
                                {productBuy.productSize === value && (
                                    <>
                                        <div className="tick-mark"></div>
                                        <i class="far fa-check"></i>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="amount genera-detail">
                    <div className="left">Số Lượng</div>
                    <div className="up-down-amount right">
                        {productBuy.quantity > 1 ? (
                            <div
                                className="volumn"
                                onClick={() => {
                                    setProductBuy({ ...productBuy, quantity: productBuy.quantity - 1 });
                                }}
                            >
                                -
                            </div>
                        ) : (
                            <div className="volumn">-</div>
                        )}
                        <div className="amount-number">{productBuy.quantity}</div>
                        <div
                            className="volumn"
                            onClick={() => {
                                setProductBuy({ ...productBuy, quantity: productBuy.quantity + 1 });
                            }}
                        >
                            +
                        </div>
                        <div className="amount-available">{productDetail.quantity} sản phẩm có sẵn</div>
                    </div>
                </div>
                <div className="buy-product genera-detail">
                    <div className="add-to-cart" onClick={() => handleOnAddToCart()}>
                        <i class="fal fa-cart-plus"></i>
                        Thêm Vào giỏ hàng
                    </div>
                    <div className="buy-now">Mua Ngay </div>
                </div>
            </div>
        </div>
    );
};
export default Detail;
