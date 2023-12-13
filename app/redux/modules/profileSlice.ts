import {createSlice} from '@reduxjs/toolkit';

interface ProfileState {
  profileData: any;
  isUploadStart: any;
  homeVerificationTitle: boolean;
  verificationStatus: any;
}

const initialState: ProfileState = {
  profileData: null,
  isUploadStart: null,
  homeVerificationTitle: false,
  verificationStatus: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action?.payload;
    },
    setIsUploadStart: (state, action) => {
      state.isUploadStart = action.payload;
    },
    setHomeVerificationTitle: (state, action) => {
      state.homeVerificationTitle = action.payload;
    },
    setVerificationStatus: (state, action) => {
      state.verificationStatus = action.payload;
    },
    profileReset: state => {
      state.profileData = null;
      state.isUploadStart = null;
      state.verificationStatus = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProfileData,
  setIsUploadStart,
  setVerificationStatus,
  profileReset,
  setHomeVerificationTitle,
} = profileSlice.actions;

export default profileSlice.reducer;
