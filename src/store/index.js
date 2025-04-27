import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import kanbanReducer from './slices/kanbanSlice';
import userReducer from './slices/userSlice';

const reducers = combineReducers({
    user: userReducer,
    kanban: kanbanReducer,
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

export const persistor = persistStore(store);
