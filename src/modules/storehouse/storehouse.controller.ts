import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { StorehouseService } from './storehouse.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	StorehouseCreateOneRequestDto,
	StorehouseDeleteOneRequestDto,
	StorehouseFindManyRequestDto,
	StorehouseFindOneRequestDto,
	StorehouseUpdateOneRequestDto,
} from './dtos/request.dtos'
import { StorehouseFindManyResponseDto, StorehouseFindOneResponseDto, StorehouseModifyResponseDto } from './dtos/response.dtos'

@Controller('storehouse')
export class StorehouseController {
	private readonly storehouseService: StorehouseService
	constructor(storehouseService: StorehouseService) {
		this.storehouseService = storehouseService
	}

	@Get('many')
	@ApiOkResponse({ type: StorehouseFindManyResponseDto })
	@ApiOperation({ summary: 'get all storehouses' })
	async findMany(@Query() query: StorehouseFindManyRequestDto): Promise<StorehouseFindManyResponseDto> {
		return this.storehouseService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one storehouse' })
	@ApiOkResponse({ type: StorehouseFindOneResponseDto })
	async findOne(@Query() query: StorehouseFindOneRequestDto): Promise<StorehouseFindOneResponseDto> {
		return this.storehouseService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one storehouse' })
	@ApiOkResponse({ type: StorehouseModifyResponseDto })
	async createOne(@Body() body: StorehouseCreateOneRequestDto): Promise<StorehouseModifyResponseDto> {
		return this.storehouseService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one storehouse' })
	@ApiOkResponse({ type: StorehouseModifyResponseDto })
	async updateOne(@Query() query: StorehouseFindOneRequestDto, @Body() body: StorehouseUpdateOneRequestDto): Promise<StorehouseModifyResponseDto> {
		return this.storehouseService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one storehouse' })
	@ApiOkResponse({ type: StorehouseModifyResponseDto })
	async deleteOne(@Query() query: StorehouseDeleteOneRequestDto): Promise<StorehouseModifyResponseDto> {
		return this.storehouseService.deleteOne(query)
	}
}
