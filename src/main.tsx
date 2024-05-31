import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import store from './store/index.ts';

const router = createBrowserRouter(
	[
		{
			path: '/',
			async lazy() {
				let { App } = await import('@/app/App.tsx');
				return { Component: App };
			},
			children: [
				{
					path: 'PicQuest',
					async lazy() {
						let { PicQuestLayout } = await import('@layout/PicQuestLayout.tsx');
						return { Component: PicQuestLayout };
					},
					children: [
						{
							index: true,
							async lazy() {
								let { PicQuest } = await import('@picquest/PicQuest.tsx');
								return { Component: PicQuest };
							},
						},
					],
				},
				{
					path: 'ReportComply',
					element: <>It works Bro </>,
				},
				{
					path: 'CompareDocs',
					element: <>It works Bro </>,
				},
				{
					path: 'DocuSense',
					element: <>It works Bro </>,
				},
			],
		},
	],
	{
		// basename: '/cybergpt/',
	},
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
