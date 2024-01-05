import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './apis/userApi';
import { searchApi } from './apis/searchApi';
import { userSlice } from './slices/user';
import { notificationsSlice } from './slices/notifications';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [searchApi.reducerPath]: searchApi.reducer,
        user: userSlice.reducer,
        notifications: notificationsSlice.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(userApi.middleware).concat(searchApi.middleware);
    },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
export {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useVerifyMutation,
    useSaveSettingsMutation,
} from './apis/userApi';
export { addNotification, removeNotification, updateNotifications } from './slices/notifications';
export { useSearchMutation, useFetchApisQuery, useFetchFiltersQuery } from './apis/searchApi';
