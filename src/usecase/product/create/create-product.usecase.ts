import { Product } from "../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./dto/create-product.dto";
import { randomUUID as uuid } from 'node:crypto';

export class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }


    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = new Product(uuid(), input.name, input.price);
        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}