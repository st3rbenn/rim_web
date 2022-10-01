import {Action, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import mainSliceReducer from './mainslice';

const persistConfig = {
  key: 'rim',
  storage: AsyncStorage,
};

const persisted = persistReducer(persistConfig, mainSliceReducer);

export const store = configureStore({
  reducer: persisted,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof mainSliceReducer>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
