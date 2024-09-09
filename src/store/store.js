import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slides/counterSlide';
import boardReducer from './slides/boardSlide';

export const store = configureStore({
    reducer: { counter: counterReducer, board: boardReducer },
});
