import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { SPSService } from './storehouse-product-status.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { SPSCreateOneRequestDto, SPSDeleteOneRequestDto, SPSFindManyRequestDto, SPSFindOneRequestDto, SPSUpdateOneRequestDto } from './dtos/request.dtos'
import { SPSFindManyResponseDto, SPSFindOneResponseDto, SPSModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('storehouse-product-status')
export class SPSController {
	private readonly spsService: SPSService
	constructor(spsService: SPSService) {
		this.spsService = spsService
	}

	@Get('many')
	@AuthOptions(true, true)
	@ApiOkResponse({ type: SPSFindManyResponseDto })
	@ApiOperation({ summary: 'get all storehouse product statuss' })
	async findMany(@Req() request: CRequest, @Query() query: SPSFindManyRequestDto): Promise<SPSFindManyResponseDto> {
		return this.spsService.findMany(request, query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one storehouse product status' })
	@ApiOkResponse({ type: SPSFindOneResponseDto })
	async findOne(@Query() query: SPSFindOneRequestDto): Promise<SPSFindOneResponseDto> {
		return this.spsService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one storehouse product status' })
	@ApiOkResponse({ type: SPSModifyResponseDto })
	async createOne(@Body() body: SPSCreateOneRequestDto): Promise<SPSModifyResponseDto> {
		return this.spsService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one storehouse product status' })
	@ApiOkResponse({ type: SPSModifyResponseDto })
	async updateOne(@Query() query: SPSFindOneRequestDto, @Body() body: SPSUpdateOneRequestDto): Promise<SPSModifyResponseDto> {
		return this.spsService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one storehouse product status' })
	@ApiOkResponse({ type: SPSModifyResponseDto })
	async deleteOne(@Query() query: SPSDeleteOneRequestDto): Promise<SPSModifyResponseDto> {
		return this.spsService.deleteOne(query)
	}
}
