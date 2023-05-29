import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  import { configureStore, combineReducers } from '@reduxjs/toolkit';
  
  import pinReducer from './pinSlice'
  import favouriteReducer from './favouriteSlice'
  import userReducer from './userSlice'
  
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };
  
  const rootReducer = combineReducers({
    pins: pinReducer,
    favourites: favouriteReducer,
    user: userReducer
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export let persistor = persistStore(store);
  