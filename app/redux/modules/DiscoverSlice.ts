import {createSlice} from '@reduxjs/toolkit';

interface discoverSliceState {
  data?: any;
  discoverPage?: any;
  lastPage?: any;
  isRefreshing: boolean;
  loadMore: boolean;
  message: string;
}

const initialState: discoverSliceState = {
  data: [],
  discoverPage: 0,
  lastPage: 0,
  isRefreshing: false,
  loadMore: false,
  message: '',
};

export const DiscoverSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setDiscoverData: (state, action) => {
      state.data = action?.payload;
    },
    setDiscoverCurrentPage: (state, action) => {
      state.discoverPage = action.payload;
    },
    setDiscoverLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setDiscoverIsRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    },
    setDiscoverLoadMore: (state, action) => {
      state.loadMore = action.payload;
    },
    setDiscoverMessage: (state, action) => {
      state.message = action.payload;
    },
    discoverReset: state => {
      state.data = [];
      state.discoverPage = 0;
      state.lastPage = 0;
      state.isRefreshing = false;
      state.loadMore = false;
      state.message = '';
    },
  },
});

export const {
  setDiscoverData,
  setDiscoverLastPage,
  setDiscoverCurrentPage,
  setDiscoverIsRefreshing,
  setDiscoverLoadMore,
  setDiscoverMessage,
  discoverReset,
} = DiscoverSlice.actions;

export default DiscoverSlice.reducer;
