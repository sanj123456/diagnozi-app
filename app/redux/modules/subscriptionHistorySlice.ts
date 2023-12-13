import {createSlice} from '@reduxjs/toolkit';
import {SubscriptionHistory} from '../../types/subscriptionHistoryType';

const initialState: SubscriptionHistory = {
  isLoading: false,
  isLoadingMore: true,
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  },
};

export const subscriptionHistorySlice = createSlice({
  name: 'subscriptionHistory',
  initialState,
  reducers: {
    setSubscriptioHistoryLoading: (state, action) => {
      return {
        ...state,
        isLoading: action?.payload,
        data: action?.payload ? [] : state.data,
      };
    },
    setSubscriptioHistoryLoadingMore: (state, action) => {
      return {...state, isLoadingMore: action?.payload};
    },
    setSubscriptioHistory: (state, action) => {
      const {data = [], meta} = action.payload;
      const isLoadingMore = meta.current_page !== meta.last_page;
      if (meta.current_page == 1) {
        return {...state, ...action?.payload, isLoadingMore};
      }
      return {...state, data: [...(<[]>state.data), ...data], meta};
    },
    resetSubscriptioHistory: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setSubscriptioHistoryLoading,
  setSubscriptioHistoryLoadingMore,
  setSubscriptioHistory,
  resetSubscriptioHistory,
} = subscriptionHistorySlice.actions;

export default subscriptionHistorySlice.reducer;
