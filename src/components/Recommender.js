import '../styles/homepages.scss';
import DEFAULT from '../storages/default';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Recommender = () => {
    const [listProduct, setListProduct] = useState(DEFAULT);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        try {
            const getProduct = async () => {
                const url = 'http://localhost:8000/api/product';
                const product = (await axios.get(url)).data;
                setListProduct(product);
            };
            getProduct();
        } catch (error) {}
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        token && setIsLogin(true);
    }, []);
    console.log(localStorage.getItem('token'));
    console.log(listProduct);
    return (
        <div className="homepage">
            <div className="main-board">
                <div className="main-board-product grid">
                    <div className="main-board-product-bar">Gợi Ý Hôm Nay</div>
                    {listProduct.map((product) => (
                        <Link
                            className="product-child"
                            key={product.id}
                            to={`/detail${product._id}`}
                            params={{ id: product.id }}
                        >
                            <img src={product.photo[0].image}></img>
                            <div className="product-child-name"> {product.name}</div>
                            <div className="product-child-detail">
                                <div className="price"> {(product.price / 1000).toFixed(3)}</div>
                                <div className="saled"> Đã bán {product.sold}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Recommender;
