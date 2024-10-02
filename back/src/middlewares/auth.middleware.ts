import { UserService } from '@/services/user/user.service'
import { Role, User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

declare global {
	namespace Express {
		interface Request {
			user?: User
		}
	}
}

const userService = new UserService()

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as any
		const user = await userService.getById(decoded.id)
		if (!user) {
			return res.status(401).json({ message: 'User not found' })
		}
		req.user = user
		next()
	} catch (err) {
		return res.status(401).json({ message: 'Invalid token' })
	}
}

export const authorize = (roles: Role[] = []) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		const hasRole = roles.some(role => req.user.rights.includes(role))
		if (!hasRole) {
			return res.status(403).json({ message: 'Forbidden' })
		}

		next()
	}
}
