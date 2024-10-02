import { AuthDto } from '@/dto/auth.dto'
import { AuthService } from '@/services/auth/auth.service'
import { RefreshTokenService } from '@/services/auth/refresh-token.service'
import { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'

const router = Router()

const authService = new AuthService()
const refreshTokenService = new RefreshTokenService()

router.post(
	'/auth/login',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	async (req: Request, res: Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const dto: AuthDto = req.body
		const { refreshToken, ...response } = await authService.login(dto)
		refreshTokenService.addRefreshTokenToResponse(res, refreshToken)
		res.status(200).json(response)
	}
)

router.post(
	'/auth/register',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	async (req: Request, res: Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const dto: AuthDto = req.body
		const { refreshToken, ...response } = await authService.register(dto)
		refreshTokenService.addRefreshTokenToResponse(res, refreshToken)
		res.status(200).json(response)
	}
)

router.post('/auth/access-token', async (req: Request, res: Response) => {
	const refreshTokenFromCookies =
		req.cookies[refreshTokenService.REFRESH_TOKEN_NAME]

	if (!refreshTokenFromCookies) {
		refreshTokenService.removeRefreshTokenFromResponse(res)
		return res.status(401).json({ message: 'Refresh token not passed' })
	}

	const { refreshToken, ...response } = await authService.getNewTokens(
		refreshTokenFromCookies
	)
	refreshTokenService.addRefreshTokenToResponse(res, refreshToken)
	res.status(200).json(response)
})

router.post('/auth/logout', async (req: Request, res: Response) => {
	refreshTokenService.removeRefreshTokenFromResponse(res)
	res.status(200).json(true)
})

export { router as authRouter }
