import { Product } from "../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { InputListProductsDto, OutputListProductsDto } from "./dto /list-products.dto";

export class ListProductsUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductsDto): Promise<OutputListProductsDto> {
        const products = await this.productRepository.findAll();

        const output = products.map((product) => ({
            id: product.id, 
            name: product.name,
            price: product.price,
        }))


        return { products: output }
    }

}