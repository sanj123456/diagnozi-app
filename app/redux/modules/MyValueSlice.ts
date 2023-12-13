import {createSlice} from '@reduxjs/toolkit';

interface MyValueSliceState {
  data?: any;
  myValuePage?: any;
  lastPage?: any;
  isRefreshing: boolean;
  loadMore: boolean;
  message: string;
}

const initialState: MyValueSliceState = {
  data: [],
  myValuePage: 0,
  lastPage: 1,
  isRefreshing: false,
  loadMore: false,
  message: '',
};

export const myValueSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setMyValueData: (state, action) => {
      state.data = action?.payload;
    },
    setMyValueCurrentPage: (state, action) => {
      state.myValuePage = action.payload;
    },
    setMyValueLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setMyValueIsRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    },
    setMyValueLoadMore: (state, action) => {
      state.loadMore = action.payload;
    },
    setMyValueMessage: (state, action) => {
      state.message = action.payload;
    },
    myValueReset: state => {
      state.data = [];
      state.myValuePage = 0;
      state.lastPage = 1;
      state.isRefreshing = false;
      state.loadMore = false;
      state.message = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMyValueData,
  setMyValueLastPage,
  setMyValueCurrentPage,
  setMyValueIsRefreshing,
  setMyValueLoadMore,
  setMyValueMessage,
  myValueReset,
} = myValueSlice.actions;

export default myValueSlice.reducer;
