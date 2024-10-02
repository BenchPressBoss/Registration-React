import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { useNavigate } from 'react-router-dom'

export function AuthToggle({ isLogin }: { isLogin: boolean }) {
	const navigate = useNavigate()

	return (
		<div className="text-center text-base mt-3">
			{isLogin ? (
				<p>
					Нет аккаунта?{' '}
					<button
						type="button"
						className="text-blue-500 text-base"
						onClick={() => navigate(PUBLIC_PAGES.REGISTER)}
					>
						Зарегистрироваться
					</button>
				</p>
			) : (
				<p>
					Уже есть аккаунт?{' '}
					<button
						type="button"
						className="text-teal-500 text-base"
						onClick={() => navigate(PUBLIC_PAGES.LOGIN)}
					>
						Войти
					</button>
				</p>
			)}
		</div>
	)
}
