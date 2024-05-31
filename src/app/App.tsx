import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { GenericLayout } from '../layout/GenericLayout';
import '../styles/scroll.css';

export const App = () => {
	return (
		<>
			<Toaster />
			<GenericLayout>
				<Outlet />
			</GenericLayout>
		</>
	);
};
