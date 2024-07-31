import { createSlice, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";
import { ProductType } from "../../types/product.type";

interface IProductState {
    products: ProductType[];
}

const initialState: IProductState = {
    products: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<ProductType[]>) {
            state.products = action.payload;
        },
        addProduct(state, action: PayloadAction<ProductType>) {
            state.products.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<ProductType>) {
            const index = state.products.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter((p) => p.id !== action.payload);
        },
    }
});

export const { setProducts, addProduct, updateProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;