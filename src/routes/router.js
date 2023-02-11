import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/auth/login/Login';
import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminRoutes from './AdminRoutes';

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


    
]);

export default router;
