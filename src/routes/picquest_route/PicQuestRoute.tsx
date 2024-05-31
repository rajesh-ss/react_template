// import { Navigate, RouteObject } from 'react-router-dom';

// // import { Login } from '../../app/auth/login/Login';
// // import { ForgotPassword } from '../../app/auth/forgot_password/ForgotPassword';
// // import ForgotPasswordByRequestByUser from '../../app/auth/forgot_password/ForgotPasswordRequestByUser';
// // import { ResetPassword } from '../../app/auth/reset_password/ResetPassword';
// // import { OTPVerification } from '../../app/auth/otp_verification/OTPVerification';

// export const authRoute: RouteObject = {
// 	path: 'picQuest',

// 	async lazy() {
// 		let { AuthWrapper } = await import('../../app/auth/AuthWrapper');
// 		return { Component: AuthWrapper };
// 	},

// 	children: [
// 		// { index: true, element: <Navigate to="login" /> },
// 		// { path: 'login', element: <Login /> },
// 		// { path: 'qr', element: <Login /> },

// 		// { path: 'forgot_password', element: <ForgotPassword /> },
// 		// { path: 'forgot_password_request', element: <ForgotPasswordByRequestByUser /> },
// 		// { path: 'reset_password', element: <ResetPassword /> },
// 		// { path: 'otp_verification', element: <OTPVerification /> },
// 	],
// };
