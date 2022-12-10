import Homepages from '../pages/Homepages';
import Detail from '../pages/Detail';
import Login from '../pages/Login';
import Register from '../pages/Register';

const publicRoutes = [
    { path: '/', component: Homepages },
    { path: '/detail:id', component: Detail },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
