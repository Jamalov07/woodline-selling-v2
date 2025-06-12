import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { ProductMVService } from './product-mv.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	ProductMVCreateOneRequestDto,
	ProductMVDeleteOneRequestDto,
	ProductMVFindManyRequestDto,
	ProductMVFindOneRequestDto,
	ProductMVUpdateOneRequestDto,
} from './dtos/request.dtos'
import { ProductMVFindManyResponseDto, ProductMVFindOneResponseDto, ProductMVModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('product-mv')
export class ProductMVController {
	private readonly productMVService: ProductMVService
	constructor(productMVService: ProductMVService) {
		this.productMVService = productMVService
	}

	@Get('many')
	@AuthOptions(true, true)
	@ApiOkResponse({ type: ProductMVFindManyResponseDto })
	@ApiOperation({ summary: 'get all storehouse products' })
	async findMany(@Req() request: CRequest, @Query() query: ProductMVFindManyRequestDto): Promise<ProductMVFindManyResponseDto> {
		return this.productMVService.findMany(request, query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one storehouse product' })
	@ApiOkResponse({ type: ProductMVFindOneResponseDto })
	async findOne(@Query() query: ProductMVFindOneRequestDto): Promise<ProductMVFindOneResponseDto> {
		return this.productMVService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one storehouse product' })
	@ApiOkResponse({ type: ProductMVModifyResponseDto })
	async createOne(@Body() body: ProductMVCreateOneRequestDto): Promise<ProductMVModifyResponseDto> {
		return this.productMVService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one storehouse product' })
	@ApiOkResponse({ type: ProductMVModifyResponseDto })
	async updateOne(@Query() query: ProductMVFindOneRequestDto, @Body() body: ProductMVUpdateOneRequestDto): Promise<ProductMVModifyResponseDto> {
		return this.productMVService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one storehouse product' })
	@ApiOkResponse({ type: ProductMVModifyResponseDto })
	async deleteOne(@Query() query: ProductMVDeleteOneRequestDto): Promise<ProductMVModifyResponseDto> {
		return this.productMVService.deleteOne(query)
	}
}
