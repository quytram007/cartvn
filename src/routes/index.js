import Homepages from '../pages/Homepages';
import Detail from '../pages/Detail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Test from '../pages/Test';
import UserInfo from '../pages/UserInfo';

const publicRoutes = [
    { path: '/', component: Homepages },
    { path: '/detail:id', component: Detail },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/cart', component: Cart },
    { path: '/user', component: UserInfo },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
