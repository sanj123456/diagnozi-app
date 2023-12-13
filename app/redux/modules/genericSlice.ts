import {createSlice} from '@reduxjs/toolkit';
import {FeedDataProps} from '../../types/components';

interface GenericState {
  isLoading: boolean;
  noInternet: boolean;
  appStateVisible: 'inactive' | 'background' | 'active' | null;
  countries: [];
  category: [];
  feed: FeedDataProps[];
  feedDetail: FeedDataProps | null;
  feedComment: FeedDataProps[];
  addComment: any;
  feedQuestions: [];
  discover: FeedDataProps[];
  rating: [];
  referral: any;
  credit: any;
  profile: any;
  subscriptionHistory: [];
  subscriptionHistoryErrorMessage: string;
  withoutSubscription: any;
  withoutSubscriptionErrorMessage: string;
  membership: [];
  transaction: [];
  withdrawHistory: [];
  notificationCount: number;
}

const initialState: GenericState = {
  isLoading: false,
  noInternet: false,
  appStateVisible: 'active',
  countries: [],
  category: [],
  feed: [],
  feedDetail: null,
  feedComment: [],
  addComment: null,
  feedQuestions: [],
  discover: [],
  rating: [],
  referral: null,
  credit: null,
  profile: null,
  subscriptionHistory: [],
  subscriptionHistoryErrorMessage: '',
  withoutSubscription: null,
  withoutSubscriptionErrorMessage: '',
  membership: [],
  transaction: [],
  withdrawHistory: [],
  notificationCount: 0,
};

export const genericSlice = createSlice({
  name: 'generic',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action?.payload;
    },
    setNoInternet: (state, action) => {
      state.noInternet = action?.payload;
    },
    setAppStateVisible: (state, action) => {
      state.appStateVisible = action?.payload;
    },
    setCountriesData: (state, action) => {
      state.countries = action?.payload;
    },
    setCategoryData: (state, action) => {
      state.category = action.payload;
    },
    setFeedDetail: (state, action) => {
      state.feedDetail = action.payload;
    },
    setFeedComment: (state, action) => {
      state.feedComment = action.payload;
    },
    setComment: (state, action) => {
      state.addComment = action.payload;
    },
    setQuestions: (state, action) => {
      state.feedQuestions = action.payload;
    },

    setDiscover: (state, action) => {
      state.discover = action.payload;
    },
    setRatingValue: (state, action) => {
      state.rating = action.payload;
    },
    setReferralValue: (state, action) => {
      state.referral = action.payload;
    },
    setCreditValue: (state, action) => {
      state.credit = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setInitialValues: state => {
      state.countries = [];
      state.category = [];
      state.feed = [];
      state.feedDetail = null;
      state.feedComment = [];
      state.addComment = null;
      state.feedQuestions = [];
      state.discover = [];
    },
    setSubscriptionHistory: (state, action) => {
      state.subscriptionHistory = action.payload;
    },
    setSubscriptionHistoryError: (state, action) => {
      state.subscriptionHistoryErrorMessage = action.payload;
    },
    setWithoutSubscription: (state, action) => {
      state.withoutSubscription = action.payload;
    },
    setWithoutSubscriptionError: (state, action) => {
      state.withoutSubscriptionErrorMessage = action.payload;
    },
    setMembership: (state, action) => {
      state.membership = action.payload;
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    setWithdrawHistory: (state, action) => {
      state.withdrawHistory = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsLoading,
  setNoInternet,
  setAppStateVisible,
  setCountriesData,
  setCategoryData,
  setFeedDetail,
  setFeedComment,
  setComment,
  setQuestions,
  setDiscover,
  setRatingValue,
  setReferralValue,
  setProfile,
  setCreditValue,
  setInitialValues,
  setSubscriptionHistory,
  setSubscriptionHistoryError,
  setWithoutSubscription,
  setWithoutSubscriptionError,
  setMembership,
  setTransaction,
  setWithdrawHistory,
  setNotificationCount,
} = genericSlice.actions;

export default genericSlice.reducer;
