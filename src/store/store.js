import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/counterSlice';
import boardReducer from './slices/boardSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        board: boardReducer,
    },
});
