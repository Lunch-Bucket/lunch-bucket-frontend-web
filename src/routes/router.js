import {createBrowserRouter} from 'react-router-dom';
import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminRoutes from './AdminRoutes';
import Feedback from '../pages/feedback/Feedback';
import User from '../pages/user/User';
import MenuHome from '../pages/menu/MenuHome';
import AddMenu from '../pages/menu/AddMenu';
import OrderLunch from '../pages/order/OrderLunch';
import OrderDinner from '../pages/order/OrderDinner';
import AddWinner from '../pages/winner/AddWinner';
import Winner from '../pages/winner/WinnerHome';
import Chat from '../pages/chat/Chat';
import AddPromotion from '../pages/promotion/AddPromotion';
import Promotion from '../pages/promotion/PromotionHome';
import Login from '../pages/login/Login';


const router = createBrowserRouter([
    {
        path: 'lunch-bucket-frontend-web',
        element: <AdminRoutes/>,
        children: [
            {
                path: 'dashboard',
                element: <DashboardHome/>
            },
         
            {
                path: 'orderDinner',
                element: <OrderDinner/>
            },
            {
                path: 'orderLunch',
                element: <OrderLunch/>
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
                path: '',
                element: <Login/>,
            },
        ]
    },
]);

export default router;
