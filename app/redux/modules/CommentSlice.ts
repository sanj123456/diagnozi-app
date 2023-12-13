import {createSlice} from '@reduxjs/toolkit';
import {Comments} from '../../types/commentsType';

const initialState: Comments = {
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

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action?.payload,
        data: action?.payload ? [] : state.data,
      };
    },
    setCommentsLoadingMore: (state, action) => {
      return {...state, isLoadingMore: action?.payload};
    },
    setComments: (state, action) => {
      const {data = [], meta} = action.payload;
      const isLoadingMore = meta.current_page !== meta.last_page;
      if (meta.current_page == 1) {
        return {...state, ...action?.payload, isLoadingMore};
      }
      return {...state, data: [...(<[]>state.data), ...data], meta};
    },
    resetComments: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setCommentsLoading,
  setCommentsLoadingMore,
  setComments,
  resetComments,
} = CommentsSlice.actions;

export default CommentsSlice.reducer;
