import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma/prisma.service'
import { UserSignInRequest } from './interfaces'

@Injectable()
export class AuthRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findOneUser(body: UserSignInRequest) {
		const user = await this.prisma.user.findFirst({
			where: { phone: body.phone },
			select: {
				id: true,
				fullname: true,
				password: true,
				phone: true,
				createdAt: true,
				deletedAt: true,
				updatedAt: true,
				actions: true,
			},
		})

		return user
	}
}
