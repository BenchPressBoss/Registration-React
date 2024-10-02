import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'

import { authRouter } from './controllers/auth.controller'
import { userRouter } from './controllers/user.controller'

dotenv.config()

export const prisma = new PrismaClient()

const app = express()

async function main() {
	// Middleware для обработки JSON и cookies
	app.use(bodyParser.json())
	app.use(cookieParser())

	app.use(
		cors({
			origin: ['http://localhost:3000'],
			credentials: true,
			exposedHeaders: 'set-cookie'
		})
	)

	app.use('/api', authRouter)
	app.use('/api/users', userRouter)

	app.all('*', (req: Request, res: Response) => {
		res.status(404).json({ error: `Route ${req.originalUrl} not found` })
	})

	const PORT = process.env.PORT || 4200
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})
}

main()
	.then(async () => {
		await prisma.$connect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
