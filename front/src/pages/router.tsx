import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { createBrowserRouter } from 'react-router-dom'

import { LoginPage } from './auth/login/Login'
import RegisterPage from './auth/register/Register'
import { HomePage } from './home/Home'
import { PlansPage } from './plans/Plans'
import { ProtectedRoutes } from './ProtectedRoutes'
import { RedirectIfAuth } from './RedirectIfAuth'

export const router = createBrowserRouter([
	{
		element: <RedirectIfAuth />,
		children: [
			{
				path: PUBLIC_PAGES.LOGIN,
				element: <LoginPage />
			},
			{
				path: PUBLIC_PAGES.REGISTER,
				element: <RegisterPage />
			}
		]
	},
	{
		element: <ProtectedRoutes />,
		children: [
			{
				path: '/',
				element: <HomePage />
			}
		]
	},
	{
		path: PUBLIC_PAGES.PLANS,
		element: <PlansPage />
	},
	{
		path: '*',
		element: <div>404 not found!</div>
	}
])
