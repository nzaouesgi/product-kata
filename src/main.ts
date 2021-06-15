import { ProductController } from "./infrastructure/controllers/ProductController"
import { ProductViewUseCase } from "./use-cases/ProductViewUseCase"
import { ProductRepositoryMemory } from "./infrastructure/adapters/ProductRepositoryMemory"
import { OrderRepositoryMemory } from "./infrastructure/adapters/OrderRepositoryMemory"
import { UserRepositoryMemory } from "./infrastructure/adapters/UserRepositoryMemory"
import { ConsoleDisplay } from "./infrastructure/adapters/ConsoleDisplay"

const productRepository = new ProductRepositoryMemory()
const userRepository = new UserRepositoryMemory()
const ordersRepository = new OrderRepositoryMemory()

const useCase = new ProductViewUseCase(productRepository, userRepository, ordersRepository)
const productController = new ProductController(useCase, new ConsoleDisplay())

productController.printProductPage(1, 1)