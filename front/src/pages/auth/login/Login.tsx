import { AuthForm } from './auth-form/AuthForm'

export function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-slate-800 p-8 rounded-lg shadow-md">
				<h2 className="font-semibold mb-4">Вход</h2>
				<AuthForm isLogin />
			</div>
		</div>
	)
}
