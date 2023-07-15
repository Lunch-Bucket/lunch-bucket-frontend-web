import {createBrowserRouter} from 'react-router-dom';
import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminRoutes from './AdminRoutes';
import Feedback from '../pages/feedback/Feedback';
import User from '../pages/user/User';
import MenuHome from '../pages/menu/MenuHome';
import AddMenu from '../pages/menu/AddMenu';
import OrderHome from '../pages/order/OrderHome';
import AddWinner from '../pages/winner/AddWinner';
import Winner from '../pages/winner/WinnerHome';
import Chat from '../pages/chat/Chat';
import AddPromotion from '../pages/promotion/AddPromotion';
import Promotion from '../pages/promotion/PromotionHome';
import Login from '../pages/login/Login';
import Home from '../pages/Home';
import OrderHome_Dinner from '../pages/order_dinner/OrderHome_Dinner';

const router = createBrowserRouter([
    {
        path: 'lunch-bucket-frontend-web',
        element: <AdminRoutes/>,
        children: [
            {
                path: '',
                element: <DashboardHome/>
            },
            {
                path: 'order',
                element: <OrderHome/>
            },
            {
                path: 'orderDinner',
                element: <OrderHome_Dinner/>
            },
            {
                path: 'feedback',
                element: <Feedback/>
            },
            {
                path: 'user',
                element: <User/>
            },
            {
                path: 'menu',
                element: <MenuHome/>
            },
            {
                path: 'addMenu',
                element: <AddMenu/>
            },
            {
                path: 'order',
                element: <OrderHome/>
            },
            {
                path: 'winner',
                element: <Winner/>
            },
            {
                path: 'addWinner',
                element: <AddWinner/>
            },
            {
                path: 'addPromotion',
                element: <AddPromotion/>
            },
            {
                path: 'promotion',
                element: <Promotion/>
            },
            {
                path: 'chat',
                element: <Chat/>,
            },
            {
                path: 'login',
                element: <Login/>,
            },
        ]
    },
]);

export default router;
