import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { PurchaseService } from './purchase.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { PurchaseCreateOneRequestDto, PurchaseDeleteOneRequestDto, PurchaseFindManyRequestDto, PurchaseFindOneRequestDto, PurchaseUpdateOneRequestDto } from './dtos/request.dtos'
import { PurchaseFindManyResponseDto, PurchaseFindOneResponseDto, PurchaseModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('purchase')
export class PurchaseController {
	private readonly purchaseService: PurchaseService
	constructor(purchaseService: PurchaseService) {
		this.purchaseService = purchaseService
	}

	@Get('many')
	@ApiOkResponse({ type: PurchaseFindManyResponseDto })
	@ApiOperation({ summary: 'get all purchases' })
	async findMany(@Query() query: PurchaseFindManyRequestDto): Promise<PurchaseFindManyResponseDto> {
		return this.purchaseService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one purchase' })
	@ApiOkResponse({ type: PurchaseFindOneResponseDto })
	async findOne(@Query() query: PurchaseFindOneRequestDto): Promise<PurchaseFindOneResponseDto> {
		return this.purchaseService.findOne(query)
	}

	@Post('one')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'add one purchase' })
	@ApiOkResponse({ type: PurchaseModifyResponseDto })
	async createOne(@Req() request: CRequest, @Body() body: PurchaseCreateOneRequestDto): Promise<PurchaseModifyResponseDto> {
		return this.purchaseService.createOne(request, body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one purchase' })
	@ApiOkResponse({ type: PurchaseModifyResponseDto })
	async updateOne(@Query() query: PurchaseFindOneRequestDto, @Body() body: PurchaseUpdateOneRequestDto): Promise<PurchaseModifyResponseDto> {
		return this.purchaseService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one purchase' })
	@ApiOkResponse({ type: PurchaseModifyResponseDto })
	async deleteOne(@Query() query: PurchaseDeleteOneRequestDto): Promise<PurchaseModifyResponseDto> {
		return this.purchaseService.deleteOne(query)
	}
}
