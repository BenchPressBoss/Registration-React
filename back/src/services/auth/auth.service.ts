import { Role, User } from '@prisma/client'
import { verify } from 'argon2'
import { JwtPayload } from 'jsonwebtoken'
import omit from 'lodash/omit'

import { AuthDto } from '@/dto/auth.dto'
import { UserService } from '../user/user.service'
import { JwtService } from './jwt.service'

export class AuthService {
	private readonly userService = new UserService()
	private readonly jwt = new JwtService()

	private readonly TOKEN_EXPIRATION_ACCESS = '1h'
	private readonly TOKEN_EXPIRATION_REFRESH = '7d'

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		return this.buildResponseObject(user)
	}

	async register(dto: AuthDto) {
		const userExists = await this.userService.getByEmail(dto.email)
		if (userExists) {
			throw new Error('User already exists')
		}
		const user = await this.userService.create(dto)

		return this.buildResponseObject(user)
	}

	async getNewTokens(refreshToken: string) {
		const result = this.jwt.verify(refreshToken) as JwtPayload
		if (!result || typeof result === 'string') {
			throw new Error('Invalid refresh token')
		}
		const user = await this.userService.getById(result.id)
		return this.buildResponseObject(user)
	}

	async buildResponseObject(user: User) {
		const tokens = await this.issueTokens(user.id, user.rights)
		return { user: this.omitPassword(user), ...tokens }
	}

	private async issueTokens(userId: string, rights: Role[]) {
		const payload = { id: userId, rights }
		const accessToken = this.jwt.sign(payload, {
			expiresIn: this.TOKEN_EXPIRATION_ACCESS
		})
		const refreshToken = this.jwt.sign(payload, {
			expiresIn: this.TOKEN_EXPIRATION_REFRESH
		})
		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)
		if (!user) {
			throw new Error('Email or password invalid')
		}
		const isValid = await verify(user.password, dto.password)
		if (!isValid) {
			throw new Error('Email or password invalid')
		}
		return user
	}

	private omitPassword(user: User) {
		return omit(user, ['password'])
	}
}
