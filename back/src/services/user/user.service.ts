import { AuthDto } from '@/dto/auth.dto'
import { PrismaClient, User } from '@prisma/client'
import { hash } from 'argon2'

export class UserService {
	private prisma = new PrismaClient()

	async getUsers() {
		return this.prisma.user.findMany({
			select: {
				name: true,
				email: true,
				id: true,
				password: false
			}
		})
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async create(dto: AuthDto) {
		return this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
			}
		})
	}

	async update(id: string, data: Partial<User>) {
		return this.prisma.user.update({
			where: {
				id
			},
			data
		})
	}
}
