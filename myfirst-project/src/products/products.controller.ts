import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.sto';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  // @Redirect('https://goole.com', 301)
  getALL(): Promise<Product[]> {
    return this.productsService.getALL();
  }
  @Get(':id')
  getONE(@Param('id') id: string): Promise<Product> {
    return this.productsService.getBYid(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
}
