import apiService from "../core/apiService";
import { ProductType } from "../types/product.type";

class ProductService {
    // Method to get all products
    public async getProducts(): Promise<ProductType[]> {
        return await apiService.get<ProductType[]>('/products');
    }
}

// Export a singleton instance of the ProductService class
const userService = new ProductService();
export default userService;