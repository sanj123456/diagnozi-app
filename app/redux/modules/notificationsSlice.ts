import {createSlice} from '@reduxjs/toolkit';
import {Notifications} from '../../types/notificationsType';

const initialState: Notifications = {
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

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action?.payload,
        data: action?.payload ? [] : state.data,
      };
    },
    setNotificationsLoadingMore: (state, action) => {
      return {...state, isLoadingMore: action?.payload};
    },
    setNotifications: (state, action) => {
      const {data = [], meta} = action.payload;
      const isLoadingMore = meta.current_page !== meta.last_page;
      if (meta.current_page == 1) {
        return {...state, ...action?.payload, isLoadingMore};
      }
      return {...state, data: [...(<[]>state.data), ...data], meta};
    },
    resetNotifications: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setNotificationsLoading,
  setNotificationsLoadingMore,
  setNotifications,
  resetNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
