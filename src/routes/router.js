import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/auth/login/Login';
import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminRoutes from './AdminRoutes';

const router = createBrowserRouter([
    {
        path: '/',
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
]);

export default router;
