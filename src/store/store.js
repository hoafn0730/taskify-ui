import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import userReducer from './slices/userSlice';
import counterReducer from './slices/counterSlice';
import boardReducer from './slices/boardSlice';
import cardReducer from './slices/cardSlice';
import workspaceReducer from './slices/workspaceSlice';

const reducers = combineReducers({
    user: userReducer,
    counter: counterReducer,
    board: boardReducer,
    card: cardReducer,
    workspace: workspaceReducer,
});

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
