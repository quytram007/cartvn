import Homepages from '../pages/Homepages';
import Detail from '../pages/Detail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import UserInfo from '../pages/UserInfo';
import Payment from '../pages/Payment';

const publicRoutes = [
    { path: '/', component: Homepages },
    { path: '/detail:id', component: Detail },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/cart', component: Cart },
    { path: '/user', component: UserInfo },
    { path: '/payment', component: Payment },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
