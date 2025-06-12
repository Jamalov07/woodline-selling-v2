import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ProductService } from './product.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { ProductCreateOneRequestDto, ProductDeleteOneRequestDto, ProductFindManyRequestDto, ProductFindOneRequestDto, ProductUpdateOneRequestDto } from './dtos/request.dtos'
import { ProductFindManyResponseDto, ProductFindOneResponseDto, ProductModifyResponseDto } from './dtos/response.dtos'

@Controller('product')
export class ProductController {
	private readonly productService: ProductService
	constructor(productService: ProductService) {
		this.productService = productService
	}

	@Get('many')
	@ApiOkResponse({ type: ProductFindManyResponseDto })
	@ApiOperation({ summary: 'get all products' })
	async findMany(@Query() query: ProductFindManyRequestDto): Promise<ProductFindManyResponseDto> {
		return this.productService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one product' })
	@ApiOkResponse({ type: ProductFindOneResponseDto })
	async findOne(@Query() query: ProductFindOneRequestDto): Promise<ProductFindOneResponseDto> {
		return this.productService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one product' })
	@ApiOkResponse({ type: ProductModifyResponseDto })
	async createOne(@Body() body: ProductCreateOneRequestDto): Promise<ProductModifyResponseDto> {
		return this.productService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one product' })
	@ApiOkResponse({ type: ProductModifyResponseDto })
	async updateOne(@Query() query: ProductFindOneRequestDto, @Body() body: ProductUpdateOneRequestDto): Promise<ProductModifyResponseDto> {
		return this.productService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one product' })
	@ApiOkResponse({ type: ProductModifyResponseDto })
	async deleteOne(@Query() query: ProductDeleteOneRequestDto): Promise<ProductModifyResponseDto> {
		return this.productService.deleteOne(query)
	}
}
