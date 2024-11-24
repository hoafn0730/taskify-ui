import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import counterReducer from './slices/counterSlice';
import boardReducer from './slices/boardSlice';
import cardReducer from './slices/cardSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        counter: counterReducer,
        board: boardReducer,
        card: cardReducer,
    },
});
