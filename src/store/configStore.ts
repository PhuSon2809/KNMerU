/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import { CACHE_EXPIRY_TIME } from '~/constants/common'
import authReducer, { AuthState } from './auth/auth.slice'
import characterReducer, { CharacterState } from './character/character.slice'
import giftReducer, { GiftState } from './gift/gift.slice'
import questionReducer, { QuestionState } from './question/question.slice'
import rootDataReducer, { RootDataState } from './root/root.slice'

// Định nghĩa state gốc
export interface RootState {
  rootData: RootDataState
  auth: AuthState
  character: CharacterState
  question: QuestionState
  gift: GiftState
}

// Kiểu state bao gồm Redux Persist
export type PersistedRootState = RootState & PersistPartial & any

// Kết hợp reducers
const rootReducer: Reducer<PersistedRootState> = combineReducers({
  rootData: rootDataReducer,
  auth: authReducer,
  character: characterReducer,
  question: questionReducer,
  gift: giftReducer
})

// Cấu hình Redux Persist
const persistConfig = {
  key: 'knmu',
  whitelist: ['rootData', 'auth', 'character', 'gift'],
  storage,
  stateReconciler: autoMergeLevel2
}

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Middleware để kiểm tra cache hết hạn
const cacheMiddleware = (_store: any) => (next: any) => (action: any) => {
  const now = Date.now()

  // Lấy thời gian cache lần cuối
  const lastPersisted = parseInt(localStorage.getItem('_persist_time') || '0', 10)

  if (lastPersisted && now - lastPersisted > CACHE_EXPIRY_TIME) {
    // Lấy dữ liệu hiện tại từ localStorage
    const persistedData = JSON.parse(localStorage.getItem('persist:knmu') || '{}')

    // Nếu tồn tại dữ liệu, chỉ xóa `settingReducer` và giữ nguyên `startReducer`
    if (persistedData) {
      delete persistedData.settingReducer // Xóa state của settingReducer
      localStorage.setItem('persist:knmu', JSON.stringify(persistedData))
    }

    // Cập nhật thời gian cache
    localStorage.setItem('_persist_time', now.toString())
  } else if (!lastPersisted) {
    // Lần đầu tiên lưu cache
    localStorage.setItem('_persist_time', now.toString())
  }

  return next(action)
}

// Hàm tạo store
const makeConfiguredStore = (reducer: Reducer<PersistedRootState>) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false // Tắt kiểm tra serializable để hoạt động với Redux Persist
      }).concat(cacheMiddleware) // Thêm cacheMiddleware
  })

// Tạo store và persistor
const makeStore = () => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    // Trả về store không có Redux Persist trên server
    return { store: makeConfiguredStore(rootReducer) }
  } else {
    const store = makeConfiguredStore(persistedReducer)
    const persistor = persistStore(store)

    return { store, persistor }
  }
}

// Lấy store và persistor
const { store, persistor } = makeStore()

// Tạo các kiểu tùy chỉnh cho Redux
export type AppDispatch = typeof store.dispatch

// Custom hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { persistor, store }
export default store
