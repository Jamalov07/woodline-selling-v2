import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { SellingService } from './selling.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { SellingCreateOneRequestDto, SellingDeleteOneRequestDto, SellingFindManyRequestDto, SellingFindOneRequestDto, SellingUpdateOneRequestDto } from './dtos/request.dtos'
import { SellingFindManyResponseDto, SellingFindOneResponseDto, SellingModifyResponseDto } from './dtos/response.dtos'

@Controller('selling')
export class SellingController {
	private readonly sellingService: SellingService
	constructor(sellingService: SellingService) {
		this.sellingService = sellingService
	}

	@Get('many')
	@ApiOkResponse({ type: SellingFindManyResponseDto })
	@ApiOperation({ summary: 'get all sellings' })
	async findMany(@Query() query: SellingFindManyRequestDto): Promise<SellingFindManyResponseDto> {
		return this.sellingService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one selling' })
	@ApiOkResponse({ type: SellingFindOneResponseDto })
	async findOne(@Query() query: SellingFindOneRequestDto): Promise<SellingFindOneResponseDto> {
		return this.sellingService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one selling' })
	@ApiOkResponse({ type: SellingModifyResponseDto })
	async createOne(@Body() body: SellingCreateOneRequestDto): Promise<SellingModifyResponseDto> {
		return this.sellingService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one selling' })
	@ApiOkResponse({ type: SellingModifyResponseDto })
	async updateOne(@Query() query: SellingFindOneRequestDto, @Body() body: SellingUpdateOneRequestDto): Promise<SellingModifyResponseDto> {
		return this.sellingService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one selling' })
	@ApiOkResponse({ type: SellingModifyResponseDto })
	async deleteOne(@Query() query: SellingDeleteOneRequestDto): Promise<SellingModifyResponseDto> {
		return this.sellingService.deleteOne(query)
	}
}
