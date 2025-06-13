import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PrismaService } from '../../modules/shared/prisma'
import { USER_ROLES_KEY } from '../decorators'

@Injectable()
export class CheckUserRolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private prisma: PrismaService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(USER_ROLES_KEY, [context.getHandler(), context.getClass()])

		if (!requiredRoles || requiredRoles.length === 0) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const userId = request.user?.id

		if (!userId) {
			throw new ForbiddenException('user id not found')
		}

		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		})

		if (!user) {
			throw new ForbiddenException('user not found')
		}

		const hasRole = requiredRoles.includes('a')
		if (!hasRole) {
			throw new ForbiddenException('permission not granted')
		}

		return true
	}
}
