import { AuthForm } from '../login/auth-form/AuthForm'

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-slate-800 p-8 rounded-lg shadow-md">
				<h2 className="font-semibold mb-4">Регистрация</h2>
				<AuthForm isLogin={false} />
			</div>
		</div>
	)
}
