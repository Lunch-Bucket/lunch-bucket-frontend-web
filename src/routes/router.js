import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/auth/login/Login';
import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminRoutes from './AdminRoutes';
import TopBar from '../component/TopBar';
import TabBar from '../component/TabBar';
import Feedback from '../pages/feedback/Feedback';
import User from '../pages/dashboard/User';
import MenuHome from '../pages/menu/MenuHome';
import AddMenu from '../pages/menu/AddMenu';
import OrderHome from '../pages/order/OrderHome';
import AddWinner from '../pages/winner/AddWinner';
import Winner from '../pages/winner/Winner';

import Chat from '../pages/chat/Chat';


const router = createBrowserRouter([
    {
        path: '/npm',
        element: <AdminRoutes />,
        children: [
            {
                path: '',
                element: <DashboardHome />
            },
        ]
    },
    {
        path: 'auth/login',
        element: <Login />,
    },

    {
        path: 'chat',
        element: <Chat/>,
    },
    {
        path: 'header',
        element: <TopBar/>
    },
    {
        path: 'actionBar',
        element: <TabBar/>
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
        path: 'addmenu',
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
        path: 'addwinner',
        element: <AddWinner/>
    },



    
]);

export default router;
