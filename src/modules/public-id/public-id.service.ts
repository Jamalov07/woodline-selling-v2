import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import { createResponse, CRequest } from '../../common'
import { PublicIdSearchRequest } from './interfaces'
import { OrderProductType, ProductType } from '@prisma/client'

@Injectable()
export class PublicIdService {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}
	async search(request: CRequest, query: PublicIdSearchRequest) {
		const cart = await this.prisma.cart.findFirst({
			where: {
				type: OrderProductType.nonstandart,
				sps: { sp: { product: { publicId: query.id } } },
			},
		})

		if (cart && cart.sellerId === request.user.id) {
			return createResponse({
				data: { exists: true, isUsable: true },
				success: { messages: ['search success'] },
				warning: { is: true, messages: ['you can use it, already exists in your cart'] },
			})
		}

		const orderProduct = await this.prisma.orderProduct.findFirst({
			where: {
				sps: { sp: { product: { publicId: query.id } } },
			},
		})
		if (orderProduct) {
			return createResponse({
				data: { exists: true, isUsable: false },
				success: { messages: ['search success'] },
				warning: { is: true, messages: ["you can't use it, already exists in order product"] },
			})
		}

		const product = await this.prisma.product.findFirst({ where: { publicId: query.id, type: ProductType.standart } })

		if (product) {
			return createResponse({
				data: { exists: true, isUsable: false },
				success: { messages: ['search success'] },
				warning: { is: true, messages: ["you can't use it, already exists in product"] },
			})
		}

		return createResponse({ data: { exists: false, isUsable: true }, success: { messages: ['search success'] } })
	}
	async generate(request: CRequest) {
		const cart = await this.prisma.cart.findFirst({
			where: { sellerId: request.user.id },
			select: { sps: { select: { sp: { select: { product: true } } } } },
		})

		if (cart) {
			return createResponse({
				data: { id: cart.sps.sp.product.publicId },
				success: { messages: ['generate success'] },
				warning: { is: true, messages: ['already generated in cart'] },
			})
		}

		const newPublicId = await this.generatingNewPublicId()
		return createResponse({ data: { id: newPublicId }, success: { messages: ['generate success'] } })
	}

	async generatingNewPublicId(): Promise<string> {
		const lastRecord = await this.prisma.publicId.findFirst({
			orderBy: { createdAt: 'desc' },
		})

		let newId = lastRecord ? lastRecord.id : 'AA000000'

		// agar lastRecord mavjud bo‘lsa, u ishlatilganmi tekshiramiz
		if (lastRecord && (await this.isPublicIdInUse(newId))) {
			newId = this.incrementPublicId(newId)
			// keyingilarni ham tekshirib chiqamiz
			while (await this.isPublicIdInUse(newId)) {
				newId = this.incrementPublicId(newId)
			}
		}

		// bazaga yozamiz
		await this.prisma.publicId.create({ data: { id: newId } }).catch((undefined): undefined => undefined)
		return newId
	}

	private async isPublicIdInUse(id: string): Promise<boolean> {
		const inCart = await this.prisma.cart.findFirst({
			where: {
				sps: { sp: { product: { publicId: id } } },
			},
		})
		const inOrderProduct = await this.prisma.orderProduct.findFirst({
			where: {
				sps: { sp: { product: { publicId: id } } },
			},
		})

		const product = await this.prisma.product.findFirst({ where: { publicId: id } })

		return !!inCart || !!inOrderProduct || !!product
	}

	private incrementPublicId(current: string): string {
		const letters = current.slice(0, 2)
		const numbers = parseInt(current.slice(2), 10)

		let nextNumbers = numbers + 1
		let nextLetters = letters

		if (nextNumbers > 999999) {
			nextNumbers = 0

			let firstCharCode = letters.charCodeAt(0)
			let secondCharCode = letters.charCodeAt(1)

			secondCharCode++
			if (secondCharCode > 90) {
				secondCharCode = 65
				firstCharCode++
				if (firstCharCode > 90) {
					throw new Error('Public ID limit reached!')
				}
			}

			nextLetters = String.fromCharCode(firstCharCode) + String.fromCharCode(secondCharCode)
		}

		const nextNumbersStr = nextNumbers.toString().padStart(6, '0')

		return nextLetters + nextNumbersStr
	}
}
