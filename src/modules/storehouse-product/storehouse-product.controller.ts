import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { StorehouseProductService } from './storehouse-product.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	StorehouseProductCreateOneRequestDto,
	StorehouseProductDeleteOneRequestDto,
	StorehouseProductFindManyRequestDto,
	StorehouseProductFindOneRequestDto,
	StorehouseProductUpdateOneRequestDto,
} from './dtos/request.dtos'
import { StorehouseProductFindManyResponseDto, StorehouseProductFindOneResponseDto, StorehouseProductModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('storehouse-product')
export class StorehouseProductController {
	private readonly storehouseProductService: StorehouseProductService
	constructor(storehouseProductService: StorehouseProductService) {
		this.storehouseProductService = storehouseProductService
	}

	@Get('many')
	@AuthOptions(true, true)
	@ApiOkResponse({ type: StorehouseProductFindManyResponseDto })
	@ApiOperation({ summary: 'get all storehouse products' })
	async findMany(@Req() request: CRequest, @Query() query: StorehouseProductFindManyRequestDto): Promise<StorehouseProductFindManyResponseDto> {
		return this.storehouseProductService.findMany(request, query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one storehouse product' })
	@ApiOkResponse({ type: StorehouseProductFindOneResponseDto })
	async findOne(@Query() query: StorehouseProductFindOneRequestDto): Promise<StorehouseProductFindOneResponseDto> {
		return this.storehouseProductService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one storehouse product' })
	@ApiOkResponse({ type: StorehouseProductModifyResponseDto })
	async createOne(@Body() body: StorehouseProductCreateOneRequestDto): Promise<StorehouseProductModifyResponseDto> {
		return this.storehouseProductService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one storehouse product' })
	@ApiOkResponse({ type: StorehouseProductModifyResponseDto })
	async updateOne(@Query() query: StorehouseProductFindOneRequestDto, @Body() body: StorehouseProductUpdateOneRequestDto): Promise<StorehouseProductModifyResponseDto> {
		return this.storehouseProductService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one storehouse product' })
	@ApiOkResponse({ type: StorehouseProductModifyResponseDto })
	async deleteOne(@Query() query: StorehouseProductDeleteOneRequestDto): Promise<StorehouseProductModifyResponseDto> {
		return this.storehouseProductService.deleteOne(query)
	}
}
