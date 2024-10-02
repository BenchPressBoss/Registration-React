import { authenticate, authorize } from '@/middlewares/auth.middleware'
import { UserService } from '@/services/user/user.service'
import { Role } from '@prisma/client'
import { Request, Response, Router } from 'express'

const router = Router()
const userService = new UserService()

router.get('/profile', authenticate, async (req: Request, res: Response) => {
	const userId = req.user.id
	const user = await userService.getById(userId)
	res.json(user)
})

router.get(
	'/premium',
	authenticate,
	authorize([Role.PREMIUM]),
	(req: Request, res: Response) => {
		res.json({ text: 'Premium content' })
	}
)

router.get(
	'/manager',
	authenticate,
	authorize([Role.ADMIN, Role.MANAGER]),
	(req: Request, res: Response) => {
		res.json({ text: 'Manager content' })
	}
)

router.get(
	'/list',
	authenticate,
	authorize([Role.ADMIN]),
	async (req: Request, res: Response) => {
		const users = await userService.getUsers()
		res.json(users)
	}
)

export { router as userRouter }
