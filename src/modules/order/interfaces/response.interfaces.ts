import { GlobalResponse, PaginationResponse } from '../../../common'
import { OrderRequired } from './fields.interfaces'
import { PaymentFindOneData } from '../../payment'
import { OrderProductFindOneData } from '../../order-product'
import { UserFindOneData } from '../../user'

export declare interface OrderFindManyData extends PaginationResponse<OrderFindOneData> {}

export declare interface OrderFindManyResponse extends GlobalResponse {
	data: OrderFindManyData
}

export declare interface OrderFindOneData extends Pick<OrderRequired, 'id' | 'deliveryAddress' | 'deliveryDate' | 'createdAt' | 'clientPStatus' | 'status'> {
	client?: UserFindOneData
	payments?: PaymentFindOneData[]
	products?: OrderProductFindOneData[]
	seller?: UserFindOneData
}

export declare interface OrderFindOneResponse extends GlobalResponse {
	data: OrderFindOneData
}

export declare interface OrderModifyResposne extends GlobalResponse {
	data: null
}
