import '../styles/product.scss';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import iconAdd from '../assets/logo/add-photo.png';
import AlertMassage from './AlertMessage';
import { useNavigate } from 'react-router-dom';
const DEFAULT = [
    {
        _id: '',
        photo: [{ image: '' }],
        name: '',
        price: 0,
    },
];
const DEFAULT_ADD = {
    name: '',
    price: '',
    photo: [],
    color: [],
    size: [],
    quantity: '',
    sale: '',
    description: '',
    _color: '',
    _size: '',
};

const Product = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [listProduct, setListProduct] = useState(DEFAULT);
    const handleChoicePhoto = useRef();
    const [addProduct, setAddProduct] = useState(DEFAULT_ADD);

    useEffect(() => {
        try {
            const getProduct = async () => {
                const token = localStorage.getItem('token');
                const data = {
                    token: token,
                };
                const url = 'http://localhost:8000/api/product/myproduct';
                const product = (await axios.post(url, data)).data;
                setListProduct(product);
            };
            getProduct();
        } catch (error) {}
    }, []);
    const handleAddPhoto = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setAddProduct({ ...addProduct, photo: [...addProduct.photo, reader.result] });
        };
    };
    let naviagte = useNavigate();
    const handleOnUploadProduct = async () => {
        try {
            setAddProduct(DEFAULT_ADD);
            setShowAlert(true);
            const url = 'http://localhost:8000/api/product/addproduct';
            const token = localStorage.getItem('token');
            const data = {
                token: token,
                addProduct: addProduct,
            };
            const upload = await axios.post(url, data);
        } catch (error) {}
    };
    return (
        <div className="product">
            <div className="header">
                <div className="title">S???n Ph???m C???a T??i</div>
                <div className="content">Qu???n l?? s???n ph???m ????ng b??n </div>
            </div>
            <div className="main">
                <div className="list-product">
                    {listProduct.map((product, index) => (
                        <div className="product-child" key={index}>
                            <Link to={`/detail${product._id}`} style={{ textDecoration: 'none', color: '#000' }}>
                                <img src={product.photo[0].image} />
                                <div className="product-name"> {product.name}</div>
                                <div className="product-child-detail">
                                    <div className="price"> {(product.price / 1000).toFixed(3)}</div>
                                    <div className="saled"> ???? b??n {product.sold}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="upload">
                    <div className="title">Upload S???n Ph???m</div>
                    <div className="photo">
                        <span>H??nh ???nh</span>
                        <div className="list-add-photo">
                            {addProduct.photo.length > 0 &&
                                addProduct.photo.map((value, index) => (
                                    <img key={index} src={value} className="child-photo" />
                                ))}
                            <input
                                type={'file'}
                                style={{ display: 'none' }}
                                ref={handleChoicePhoto}
                                onChange={(e) => handleAddPhoto(e)}
                            ></input>
                            <img onClick={() => handleChoicePhoto.current.click()} src={iconAdd} className="icon"></img>
                        </div>
                    </div>
                    <div className="product-name">
                        <span>T??n S???n Ph???m</span>
                        <div>
                            <input
                                className="input-name"
                                value={addProduct.name}
                                onChange={(e) => setAddProduct({ ...addProduct, name: e.target.value })}
                            ></input>
                        </div>
                    </div>
                    <div className="product-price">
                        <div>
                            <span>Gi?? Th??nh</span>
                            <input
                                className="price"
                                value={addProduct.price}
                                onChange={(e) => setAddProduct({ ...addProduct, price: e.target.value })}
                            ></input>
                        </div>
                        <div>
                            <span>S??? L?????ng</span>
                            <input
                                value={addProduct.quantity}
                                onChange={(e) => setAddProduct({ ...addProduct, quantity: e.target.value })}
                            ></input>
                        </div>
                    </div>
                    <div className="product-price">
                        <div>
                            <span>Gi???m Gi??</span>
                            <input
                                value={addProduct.sale}
                                onChange={(e) => setAddProduct({ ...addProduct, sale: e.target.value })}
                            ></input>
                        </div>
                    </div>
                    <div className="product-color">
                        <div className="header-color">
                            <div className="title-color">M??u S???c:</div>
                            {addProduct.color.map((value, index) => (
                                <div key={index} className="child-color">
                                    {value}
                                </div>
                            ))}
                        </div>
                        <div>
                            <input
                                className="input-color"
                                value={addProduct._color}
                                onChange={(e) => setAddProduct({ ...addProduct, _color: e.target.value })}
                            ></input>
                            <button
                                className="add-color"
                                onClick={() =>
                                    setAddProduct({
                                        ...addProduct,
                                        color: [...addProduct.color, addProduct._color],
                                        _color: '',
                                    })
                                }
                            >
                                Th??m
                            </button>
                        </div>
                    </div>
                    <div className="product-color">
                        <div className="header-color">
                            <div className="title-color">Size:</div>
                            {addProduct.size.map((value, index) => (
                                <div key={index} className="child-color">
                                    {value}
                                </div>
                            ))}
                        </div>
                        <div>
                            <input
                                className="input-color"
                                value={addProduct._size}
                                onChange={(e) => setAddProduct({ ...addProduct, _size: e.target.value })}
                            ></input>
                            <button
                                className="add-color"
                                onClick={() =>
                                    setAddProduct({
                                        ...addProduct,
                                        size: [...addProduct.size, addProduct._size],
                                        _size: '',
                                    })
                                }
                            >
                                Th??m
                            </button>
                        </div>
                    </div>
                    <div className="product-decription">
                        <span>M?? t???</span>
                        <div>
                            <textarea
                                value={addProduct.description}
                                onChange={(e) => setAddProduct({ ...addProduct, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="finish-upload">
                        <button
                            onClick={() => {
                                handleOnUploadProduct();
                            }}
                        >
                            ????ng B??n
                        </button>
                    </div>
                </div>
            </div>
            {showAlert === true && (
                <AlertMassage
                    className="alert"
                    message="upload th??nh c??ng"
                    style={{ position: 'fixed' }}
                ></AlertMassage>
            )}
        </div>
    );
};
export default Product;
