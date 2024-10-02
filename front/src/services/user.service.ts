import { axiosClassic } from '@/api/axios'
import { IUser } from '@/types/types'

class UserService {
	private _BASE_URL = '/users'

	async fetchProfile() {
		return axiosClassic.get<IUser>(`${this._BASE_URL}/profile`)
	}

	async fetchPremium() {
		return axiosClassic.get<{ text: string }>(`${this._BASE_URL}/premium`)
	}

	async fetchManagerContent() {
		return axiosClassic.get<{ text: string }>(`${this._BASE_URL}/manager`)
	}

	async fetchList() {
		return axiosClassic.get<IUser[]>(`${this._BASE_URL}/list`)
	}
}

export default new UserService()
