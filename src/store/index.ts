import {Action, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import localforage from 'localforage';

import mainSliceReducer from './mainslice';

const persistConfig = {
  key: 'Rim',
};

export const store = configureStore({
  reducer: mainSliceReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof mainSliceReducer>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();