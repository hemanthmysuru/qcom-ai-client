import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import productReducer from '../slices/productSlice';
import cameraReducer from '../slices/cameraSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        camera: cameraReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;