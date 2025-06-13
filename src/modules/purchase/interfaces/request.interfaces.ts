import { ProductMVStatus } from '@prisma/client'
import { PaginationRequest, RequestOtherFields } from '../../../common'
import { PurchaseOptional, PurchaseRequired } from './fields.interfaces'

export declare interface PurchaseFindManyRequest
	extends PaginationRequest,
		Pick<PurchaseOptional, 'providerId' | 'storehouseId' | 'status' | 'storekeeperId'>,
		Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface PurchaseFindOneRequest extends Pick<PurchaseRequired, 'id'> {}

export declare interface PurchaseGetManyRequest extends PaginationRequest, PurchaseOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface PurchaseGetOneRequest extends PurchaseOptional {}

export declare interface PurchaseProduct {
	id: string
	statuses: PurchaseProductStatus[]
}

export declare interface PurchaseProductStatus {
	status: ProductMVStatus
	quantity: number
}

export declare interface PurchaseCreateOneRequest extends Pick<PurchaseRequired, 'providerId' | 'storehouseId'>, Pick<PurchaseOptional, 'storekeeperId'> {
	productMVs: PurchaseProduct[]
}

export declare interface PurchaseUpdateOneRequest extends Pick<PurchaseOptional, 'providerId' | 'storehouseId' | 'storekeeperId' | 'status' | 'deletedAt'> {}

export declare interface PurchaseDeleteOneRequest extends Pick<PurchaseOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
