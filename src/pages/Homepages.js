import '../styles/homepages.scss';
import DEFAULT from '../storages/default';
import { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchResult from '../components/SearchResult';
import refreshComponent from '../components/RefreshComponent';
import Recommender from '../components/Recommender';

const Homepages = () => {
    const [listProduct, setListProduct] = useState(DEFAULT);
    const [isLogin, setIsLogin] = useState(false);
    const { search } = useContext(refreshComponent);

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
    return search !== '' ? <SearchResult /> : <Recommender />;
};
export default Homepages;
