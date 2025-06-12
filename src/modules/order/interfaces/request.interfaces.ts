import { PaginationRequest, RequestOtherFields } from '../../../common'
import { PaymentCreateOneRequest } from '../../payment'
import { OrderOptional, OrderRequired } from './fields.interfaces'

export declare interface OrderFindManyRequest
	extends PaginationRequest,
		Pick<OrderOptional, 'clientId' | 'deliveryAddress' | 'sellerId'>,
		Pick<RequestOtherFields, 'ids' | 'isDeleted' | 'search'> {}

export declare interface OrderFindOneRequest extends Pick<OrderRequired, 'id'> {}

export declare interface OrderGetManyRequest extends PaginationRequest, OrderOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface OrderGetOneRequest extends OrderOptional {}

export declare interface OrderCreateOneRequest extends Pick<OrderRequired, 'clientId' | 'deliveryAddress' | 'deliveryDate' | 'sellerId'>, Pick<OrderOptional, 'clientPStatus'> {}

export declare interface OrderCreateOneWithPaymentProductRequest
	extends Pick<OrderRequired, 'clientId' | 'deliveryAddress' | 'deliveryDate'>,
		Pick<OrderOptional, 'sellerId' | 'clientPStatus'> {
	payments: Omit<PaymentCreateOneRequest, 'orderId'>[]
}

export declare interface OrderUpdateOneRequest extends Pick<OrderOptional, 'clientId' | 'deletedAt' | 'status' | 'deliveryDate' | 'deliveryAddress' | 'sellerId'> {}

export declare interface OrderDeleteOneRequest extends Pick<OrderOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
