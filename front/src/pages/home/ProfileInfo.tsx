import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { useProfile } from '@/hooks/useProfile'
import { removeFromStorage } from '@/services/auth/auth.helper'

export function ProfileInfo() {
	const { user, isLoading } = useProfile()

	if (isLoading) return <div className="mt-10">Загружаю профиль...</div>

	return (
		<div className="mt-10">
			{user.avatarPath && (
				<img
					src={user.avatarPath}
					alt="Avatar"
					width={70}
					height={70}
				/>
			)}
			<h2 className="text-2xl font-bold">Привет, {user.name || 'Аноним'}</h2>
			<br />
			<p className="text-lg">
				Ваш email: {user.email}{' '}
				<i>
					({user.verificationToken ? 'Требует подтверждения' : 'Подтверждена'})
				</i>
			</p>
			<br />
			<p>Права: {user.rights?.join(', ')}</p>
			<br />
			<button
				onClick={() => {
					removeFromStorage()
					window.location.href = PUBLIC_PAGES.LOGIN
				}}
				className={'mt-2 bg-blue-500 text-white px-4 py-2 rounded-md'}
			>
				Выйти
			</button>
		</div>
	)
}
