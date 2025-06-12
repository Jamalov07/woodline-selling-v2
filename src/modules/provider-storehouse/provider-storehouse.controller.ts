import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { ProviderStorehouseService } from './provider-storehouse.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	ProviderStorehouseCreateOneRequestDto,
	ProviderStorehouseDeleteOneRequestDto,
	ProviderStorehouseFindManyRequestDto,
	ProviderStorehouseFindOneRequestDto,
	ProviderStorehouseUpdateOneRequestDto,
} from './dtos/request.dtos'
import { ProviderStorehouseFindManyResponseDto, ProviderStorehouseFindOneResponseDto, ProviderStorehouseModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions } from '../../common'

@Controller('provider-storehouse')
export class ProviderStorehouseController {
	private readonly providerStorehouseService: ProviderStorehouseService
	constructor(providerStorehouseService: ProviderStorehouseService) {
		this.providerStorehouseService = providerStorehouseService
	}

	@Get('many')
	@AuthOptions(true, true)
	@ApiOkResponse({ type: ProviderStorehouseFindManyResponseDto })
	@ApiOperation({ summary: 'get all storehouse products' })
	async findMany(@Query() query: ProviderStorehouseFindManyRequestDto): Promise<ProviderStorehouseFindManyResponseDto> {
		return this.providerStorehouseService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one storehouse product' })
	@ApiOkResponse({ type: ProviderStorehouseFindOneResponseDto })
	async findOne(@Query() query: ProviderStorehouseFindOneRequestDto): Promise<ProviderStorehouseFindOneResponseDto> {
		return this.providerStorehouseService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one storehouse product' })
	@ApiOkResponse({ type: ProviderStorehouseModifyResponseDto })
	async createOne(@Body() body: ProviderStorehouseCreateOneRequestDto): Promise<ProviderStorehouseModifyResponseDto> {
		return this.providerStorehouseService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one storehouse product' })
	@ApiOkResponse({ type: ProviderStorehouseModifyResponseDto })
	async updateOne(@Query() query: ProviderStorehouseFindOneRequestDto, @Body() body: ProviderStorehouseUpdateOneRequestDto): Promise<ProviderStorehouseModifyResponseDto> {
		return this.providerStorehouseService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one storehouse product' })
	@ApiOkResponse({ type: ProviderStorehouseModifyResponseDto })
	async deleteOne(@Query() query: ProviderStorehouseDeleteOneRequestDto): Promise<ProviderStorehouseModifyResponseDto> {
		return this.providerStorehouseService.deleteOne(query)
	}
}
