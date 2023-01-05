import '../styles/product.scss';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import iconAdd from '../assets/logo/add-photo.png';
const DEFAULT = [
    {
        _id: '',
        photo: [{ image: '' }],
        name: '',
        price: 0,
    },
];
const ListProduct = () => {
    const [listProduct, setListProduct] = useState(DEFAULT);
    useEffect(() => {
        try {
            const getProduct = async () => {
                const token = localStorage.getItem('token');
                const data = {
                    token: token,
                };
                const url = 'http://localhost:8000/api/product/myhistory';
                const { data: res } = await axios.post(url, data);
                console.log(res[0].listProduct);

                setListProduct(res[0].listProduct);
            };
            getProduct();
        } catch (error) {}
    }, []);
    return (
        <div className="product">
            <div className="header">
                <div className="title">Lịch Sử</div>
                <div className="content">Sản phẩm đã mua</div>
            </div>
            <div className="main">
                <div className="list-product">
                    {listProduct.map((product, index) => (
                        <div className="product-child" key={index}>
                            <Link to={`/detail${product.productId}`} style={{ textDecoration: 'none', color: '#000' }}>
                                <img src={product.productImg} />
                                <div className="product-name"> {product.productName}</div>
                                <div className="product-child-detail">
                                    <div className="price"> {(product.productPrice / 1000).toFixed(3)}</div>
                                    {/* <div className="saled"> Đã bán {product.sold}</div> */}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ListProduct;
