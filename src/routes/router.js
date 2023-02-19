import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/auth/login/Login';
import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminRoutes from './AdminRoutes';

import Chat from '../pages/chat/Chat';
import DailyWinnerView from '../pages/DailyWinnerView/DailyWinner';
import DailyWinnerAdd from '../pages/DailyWinnerAdd/DailyWinnerAdd';
import OrderList from '../pages/orderList/OrderList';




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
        path: 'DWV',
        element: <DailyWinnerView/>,
    },

    {
        path: 'DWA',
        element: <DailyWinnerAdd/>,
    },

    {
        path: 'OList',
        element: <OrderList/>,
    },



    
]);

export default router;
