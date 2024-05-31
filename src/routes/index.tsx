import App from '@/app/App';
import { Navigate, createBrowserRouter } from 'react-router-dom';
// import { authRoute } from './auth/authRoute';
// import { adminRoute } from './admin/adminRoute';
// import { bdtRoute } from './bdt/bdtRoute';
// import { branchManagerRoute } from './branch_manager/branchManagerRoute';
// import { branchAssociateRoute } from './branch_associate/branchAssociateRoute';
// import { treasuryRoute } from './treasury/treasuryRoute';
// import { atoRoute } from './ato/atoRoute';
// import { invalidRoute } from './invalid_route/invalidRoute';
// import { BSPRoutes } from './bsp/BSPRoutes';

// import { QRRoute } from './qr/QRRoute';

// import { App } from '../app/App';

export const routesV1 = createBrowserRouter([
	{
		path: '/v1',
		element: <App />,
		children: [
			// { ... },
			{ path: '*', element: <Navigate to="404" /> },
		],
	},
	{ path: '*', element: <Navigate to="/v1/auth/login" /> },
]);
