import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { ProductStatusMVService } from './product-status-mv.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	ProductStatusMVCreateOneRequestDto,
	ProductStatusMVDeleteOneRequestDto,
	ProductStatusMVFindManyRequestDto,
	ProductStatusMVFindOneRequestDto,
	ProductStatusMVUpdateOneRequestDto,
} from './dtos/request.dtos'
import { ProductStatusMVFindManyResponseDto, ProductStatusMVFindOneResponseDto, ProductStatusMVModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('product-status-mv')
export class ProductStatusMVController {
	private readonly productStatusMVService: ProductStatusMVService
	constructor(productStatusMVService: ProductStatusMVService) {
		this.productStatusMVService = productStatusMVService
	}

	@Get('many')
	@AuthOptions(true, true)
	@ApiOkResponse({ type: ProductStatusMVFindManyResponseDto })
	@ApiOperation({ summary: 'get all storehouse product statuss' })
	async findMany(@Req() request: CRequest, @Query() query: ProductStatusMVFindManyRequestDto): Promise<ProductStatusMVFindManyResponseDto> {
		return this.productStatusMVService.findMany(request, query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one storehouse product status' })
	@ApiOkResponse({ type: ProductStatusMVFindOneResponseDto })
	async findOne(@Query() query: ProductStatusMVFindOneRequestDto): Promise<ProductStatusMVFindOneResponseDto> {
		return this.productStatusMVService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one storehouse product status' })
	@ApiOkResponse({ type: ProductStatusMVModifyResponseDto })
	async createOne(@Body() body: ProductStatusMVCreateOneRequestDto): Promise<ProductStatusMVModifyResponseDto> {
		return this.productStatusMVService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one storehouse product status' })
	@ApiOkResponse({ type: ProductStatusMVModifyResponseDto })
	async updateOne(@Query() query: ProductStatusMVFindOneRequestDto, @Body() body: ProductStatusMVUpdateOneRequestDto): Promise<ProductStatusMVModifyResponseDto> {
		return this.productStatusMVService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one storehouse product status' })
	@ApiOkResponse({ type: ProductStatusMVModifyResponseDto })
	async deleteOne(@Query() query: ProductStatusMVDeleteOneRequestDto): Promise<ProductStatusMVModifyResponseDto> {
		return this.productStatusMVService.deleteOne(query)
	}
}
