import {createSlice} from '@reduxjs/toolkit';
import {Ratings} from '../../types/ratingsType';

const initialState: Ratings = {
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

export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRatingsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action?.payload,
        data: action?.payload ? [] : state.data,
      };
    },
    setRatingsLoadingMore: (state, action) => {
      return {...state, isLoadingMore: action?.payload};
    },
    setRatings: (state, action) => {
      const {data = [], meta} = action.payload;
      const isLoadingMore = meta.current_page !== meta.last_page;
      if (meta.current_page == 1) {
        return {...state, ...action?.payload, isLoadingMore};
      }
      return {...state, data: [...(<[]>state.data), ...data], meta};
    },
    resetRatings: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setRatingsLoading,
  setRatingsLoadingMore,
  setRatings,
  resetRatings,
} = ratingsSlice.actions;

export default ratingsSlice.reducer;
