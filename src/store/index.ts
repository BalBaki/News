import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './apis/userApi';
import { userSlice } from './slices/user';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        user: userSlice.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(userApi.middleware);
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
