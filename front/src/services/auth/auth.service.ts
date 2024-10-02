import { axiosClassic } from '@/api/axios'
import { IFormData, IUser } from '@/types/types'
import { saveTokenStorage } from './auth.helper'

interface IAuthResponse {
	accessToken: string
	user: IUser
}

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

class AuthService {
	async main(type: 'login' | 'register', data: IFormData) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}
}

export default new AuthService()
