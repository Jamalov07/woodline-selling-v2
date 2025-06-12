import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException, RequestMethod, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../../modules/shared/prisma'
import { ActionMethod } from '@prisma/client'
import { CRequest } from '../interfaces'

@Injectable()
export class CheckPermissionGuard implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<CRequest>()

		if (!request.user) {
			throw new UnauthorizedException('check permission guard: user not found')
		}

		const controller = context.getClass()
		const baseRoute = Reflect.getMetadata('path', controller) || ''

		const handler = context.getHandler()
		const route = Reflect.getMetadata('path', handler) || ''
		const method = Reflect.getMetadata('method', handler)

		if (method === undefined) {
			throw new BadRequestException('⛔ HTTP method metadata not found')
		}

		const fullRoute = `${baseRoute}/${route}`.replace(/\/+/g, '/')
		const methodType = RequestMethod[method].toLowerCase() as ActionMethod

		const payload = { url: fullRoute, name: handler.name, method: methodType }

		const action = await this.prisma.action.findFirst({ where: { ...payload } })

		if (!action) {
			throw new NotFoundException(`Cannot_ ${methodType.toUpperCase()} /${fullRoute}`)
		}
		const user = await this.prisma.user.findFirst({
			select: { actions: { select: { name: true, method: true, url: true } } },
		})

		if (!user) {
			throw new BadRequestException('Permission not granted')
		}

		return true
	}
}
