import { IDisplay } from "../../domain/common/ports/IDisplay"
import { ProductDto } from "../dto/ProductDto"
import { ProductViewUseCase } from "../../use-cases/ProductViewUseCase"
import chalk from "chalk"

export class ProductController {


    public constructor(
        private readonly productViewUseCase: ProductViewUseCase,
        private readonly display: IDisplay
    ) {}

    private printProduct(product: ProductDto) {
        
        let page = `${chalk.bold.cyan(product.name)}\n` +
            `${chalk.grey(product.category)}\n` +
            `${chalk.bold.green(product.price)}€\n\n` +
            `${product.description}\n\n` +
            `Details:\n`

        for (let k in product.details) {
            page += `• ${k}: ${product.details[k]}\n`
        }

        this.display.log(page)
    }

    public printProductPage(productId: number, userId: number) {
        try {
            const product = this.productViewUseCase.execute(productId, userId)
            this.printProduct(new ProductDto(product))
        } catch(e) {
            this.display.log(chalk.bold.red(e))
        }
    }
}