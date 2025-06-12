import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { SPSBookingService } from './storehouse-product-status-booking.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	SPSBookingCreateOneRequestDto,
	SPSBookingDeleteOneRequestDto,
	SPSBookingFindManyRequestDto,
	SPSBookingFindOneRequestDto,
	SPSBookingUpdateOneRequestDto,
} from './dtos/request.dtos'
import { SPSBookingFindManyResponseDto, SPSBookingFindOneResponseDto, SPSBookingModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('storehouse-product-status-booking')
export class SPSBookingController {
	private readonly spsBookingService: SPSBookingService
	constructor(spsBookingService: SPSBookingService) {
		this.spsBookingService = spsBookingService
	}

	@Get('many')
	@AuthOptions(true, true)
	@ApiOkResponse({ type: SPSBookingFindManyResponseDto })
	@ApiOperation({ summary: 'get all storehouse product status bookings' })
	async findMany(@Query() query: SPSBookingFindManyRequestDto): Promise<SPSBookingFindManyResponseDto> {
		return this.spsBookingService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one storehouse product status booking' })
	@ApiOkResponse({ type: SPSBookingFindOneResponseDto })
	async findOne(@Query() query: SPSBookingFindOneRequestDto): Promise<SPSBookingFindOneResponseDto> {
		return this.spsBookingService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one storehouse product status booking' })
	@ApiOkResponse({ type: SPSBookingModifyResponseDto })
	async createOne(@Req() request: CRequest, @Body() body: SPSBookingCreateOneRequestDto): Promise<SPSBookingModifyResponseDto> {
		return this.spsBookingService.createOne(request, body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one storehouse product status booking' })
	@ApiOkResponse({ type: SPSBookingModifyResponseDto })
	async updateOne(@Query() query: SPSBookingFindOneRequestDto, @Body() body: SPSBookingUpdateOneRequestDto): Promise<SPSBookingModifyResponseDto> {
		return this.spsBookingService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one storehouse product status booking' })
	@ApiOkResponse({ type: SPSBookingModifyResponseDto })
	async deleteOne(@Query() query: SPSBookingDeleteOneRequestDto): Promise<SPSBookingModifyResponseDto> {
		return this.spsBookingService.deleteOne(query)
	}
}
