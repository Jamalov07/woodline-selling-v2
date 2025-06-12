import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { TransferService } from './transfer.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { TransferCreateOneRequestDto, TransferDeleteOneRequestDto, TransferFindManyRequestDto, TransferFindOneRequestDto, TransferUpdateOneRequestDto } from './dtos/request.dtos'
import { TransferFindManyResponseDto, TransferFindOneResponseDto, TransferModifyResponseDto } from './dtos/response.dtos'

@Controller('transfer')
export class TransferController {
	private readonly transferService: TransferService
	constructor(transferService: TransferService) {
		this.transferService = transferService
	}

	@Get('many')
	@ApiOkResponse({ type: TransferFindManyResponseDto })
	@ApiOperation({ summary: 'get all transfers' })
	async findMany(@Query() query: TransferFindManyRequestDto): Promise<TransferFindManyResponseDto> {
		return this.transferService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one transfer' })
	@ApiOkResponse({ type: TransferFindOneResponseDto })
	async findOne(@Query() query: TransferFindOneRequestDto): Promise<TransferFindOneResponseDto> {
		return this.transferService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one transfer' })
	@ApiOkResponse({ type: TransferModifyResponseDto })
	async createOne(@Body() body: TransferCreateOneRequestDto): Promise<TransferModifyResponseDto> {
		return this.transferService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one transfer' })
	@ApiOkResponse({ type: TransferModifyResponseDto })
	async updateOne(@Query() query: TransferFindOneRequestDto, @Body() body: TransferUpdateOneRequestDto): Promise<TransferModifyResponseDto> {
		return this.transferService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one transfer' })
	@ApiOkResponse({ type: TransferModifyResponseDto })
	async deleteOne(@Query() query: TransferDeleteOneRequestDto): Promise<TransferModifyResponseDto> {
		return this.transferService.deleteOne(query)
	}
}
