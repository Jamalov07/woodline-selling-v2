import { Request } from 'express'
import { DeleteMethodEnum } from '../enums'
import { RoleName } from '@prisma/client'

export declare interface RequestOtherFields {
	ids?: string[]
	search?: string
	method?: DeleteMethodEnum
	isDeleted?: boolean
	actionsToConnect?: string[]
	actionsToDisconnect?: string[]
	rolesToConnect?: RoleName[]
	rolesToDisconnect?: RoleName[]
	startDate?: Date
	endDate?: Date
	roleNames?: RoleName[]
}

export declare interface CRequest extends Request {
	user?: { id: string; token?: string }
}
