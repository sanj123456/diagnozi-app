import {configureStore} from '@reduxjs/toolkit';
import genericSlice from './modules/genericSlice';
import profileSlice from './modules/profileSlice';
import MyValueSlice from './modules/MyValueSlice';
import DiscoverSlice from './modules/DiscoverSlice';
import subscriptionHistorySlice from './modules/subscriptionHistorySlice';
import FeedSlice from './modules/FeedSlice';
import CommentSlice from './modules/CommentSlice';
import notificationsSlice from './modules/notificationsSlice';
import ratingsSlice from './modules/ratingsSlice';

const store = configureStore({
  reducer: {
    generic: genericSlice,
    profile: profileSlice,
    myvalue: MyValueSlice,
    discover: DiscoverSlice,
    subscriptionHistory: subscriptionHistorySlice,
    feeds: FeedSlice,
    comments: CommentSlice,
    notifications: notificationsSlice,
    ratings: ratingsSlice,
  },
});
const dispatch = store.dispatch;
const getStore = store.getState;
export {dispatch, getStore};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
