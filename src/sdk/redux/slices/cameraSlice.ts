// src/slices/cameraSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CameraConfigType } from '../../types/cameraConfig.type';

interface CameraState {
    cameraList: CameraConfigType[];
}

const initialState: CameraState = {
    cameraList: [],
};

const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers: {
        setCameraList: (state, action: PayloadAction<CameraConfigType[]>) => {
            state.cameraList = action.payload;
        },
        addCamera: (state, action: PayloadAction<CameraConfigType>) => {
            state.cameraList.push(action.payload);
        },
        deleteCamera: (state, action: PayloadAction<string>) => {
            state.cameraList = state.cameraList.filter(camera => camera.id != action.payload);
        }
    },
});

export const { setCameraList, addCamera, deleteCamera } = cameraSlice.actions;

export default cameraSlice.reducer;
