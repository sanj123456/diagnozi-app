import {createSlice} from '@reduxjs/toolkit';

interface feedSliceState {
  data?: any;
  feedPage?: any;
  lastPage?: any;
  isRefreshing: boolean;
  loadMore: boolean;
  message: string;
}

const initialState: feedSliceState = {
  data: [],
  feedPage: 0,
  lastPage: 1,
  isRefreshing: false,
  loadMore: false,
  message: '',
};

export const FeedSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFeedData: (state, action) => {
      state.data = action?.payload;
    },
    setFeedCurrentPage: (state, action) => {
      state.feedPage = action.payload;
    },
    setFeedLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setFeedIsRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    },
    setFeedLoadMore: (state, action) => {
      state.loadMore = action.payload;
    },
    setFeedMessage: (state, action) => {
      state.message = action.payload;
    },
    feedReset: state => {
      state.data = [];
      state.feedPage = 0;
      state.lastPage = 1;
      state.isRefreshing = false;
      state.loadMore = false;
      state.message = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFeedData,
  setFeedLastPage,
  setFeedCurrentPage,
  setFeedIsRefreshing,
  setFeedLoadMore,
  feedReset,
  setFeedMessage,
} = FeedSlice.actions;

export default FeedSlice.reducer;
