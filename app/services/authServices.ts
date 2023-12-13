import {get, post} from './request';
import {getAsyncData, setAsyncData} from './asyncServices';
import {
  setIsUploadStart,
  setProfileData,
  setVerificationStatus,
} from '../redux/modules/profileSlice';

import {dispatch, getStore} from '../redux';
import {setIsLoading} from '../redux/modules/genericSlice';

import {constants, errorToast, screenName, successToast} from '../core';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {navigate} from '../navigation/RootNavigation';

export const signpAPI = (data: any) => {
  dispatch(setIsLoading(true));
  post(constants.endPtRegister, data)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        successToast(res.message, '', 'top');
        dispatch(setProfileData(res.data));
        setAsyncData(constants.userData, res.data);
        if (res.data.profile_status === 1) {
          setAsyncData(constants.isUploadStart, true);
          dispatch(setIsUploadStart(true));
        } else {
          setAsyncData(constants.isUploadStart, false);
          dispatch(setIsUploadStart(false));
        }
        const isUploadStart = getStore().profile.isUploadStart;
        navigate(
          (isUploadStart === false &&
            res.data.user_type === 3 &&
            res.data.profile_status === 0) ||
            (isUploadStart === false &&
              res.data.user_type === 3 &&
              res.data.profile_status === 2)
            ? screenName.feedscreen
            : screenName.homeScreen,
        );
      } else {
        errorToast(res?.message, '', 'top');
      }
      dispatch(setIsLoading(false));
    })
    .catch(e => {
      console.log('API ERROR', e);
      dispatch(setIsLoading(false));
    });
};

export const loginAPI = (data: any) => {
  dispatch(setIsLoading(true));
  post(constants.endPtLogin, data)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        successToast(res.message, '', 'top');
        dispatch(setProfileData(res.data));
        setAsyncData(constants.userData, res.data);

        if (res.data.profile_status === 1) {
          setAsyncData(constants.isUploadStart, true);
          dispatch(setIsUploadStart(true));
        } else {
          setAsyncData(constants.isUploadStart, false);
          dispatch(setIsUploadStart(false));
        }
        const isUploadStart = getStore().profile.isUploadStart;
        navigate(
          (isUploadStart === false &&
            res.data.user_type === 3 &&
            res.data.profile_status === 0) ||
            (isUploadStart === false &&
              res.data.user_type === 3 &&
              res.data.profile_status === 2)
            ? screenName.feedscreen
            : screenName.homeScreen,
        );
      } else {
        errorToast(res?.message, '', 'top');
      }
      dispatch(setIsLoading(false));
    })
    .catch(e => {
      console.log('API ERROR', e);
      dispatch(setIsLoading(false));
    });
};

export const googleSignin = () => {
  return new Promise(async (response, reject) => {
    try {
      const hasPlayService = await GoogleSignin.hasPlayServices();
      if (hasPlayService) {
        const userInfo = await GoogleSignin.signIn();
        // console.log(request.name, JSON.stringify(userInfo));
        const fcmToken = await getAsyncData(constants.asyncFcmToken);
        response({
          provider_id: userInfo?.user?.id,
          provider_name: constants.google,
          email: userInfo?.user?.email,
          full_name: userInfo?.user?.name,
          social_account_token: userInfo?.idToken,
          device_token: fcmToken,
          device_type:
            Platform.OS === 'android' ? 1 : Platform.OS === 'ios' ? 2 : 0,
        });
      }
    } catch (err) {
      console.log('ERROR IS: ' + JSON.stringify(err));
      reject(err);
    }
  });
};

export const facebookSignin = () => {
  return new Promise(async (response, reject) => {
    try {
      const login = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (!login.isCancelled) {
        const result = await AccessToken.getCurrentAccessToken();
        const accessToken = result?.accessToken.toString();

        if (accessToken) {
          const PROFILE_REQUEST_PARAMS = {
            fields: {
              string: 'id,name,email',
            },
          };
          const profileRequest = new GraphRequest(
            '/me',
            {accessToken, parameters: PROFILE_REQUEST_PARAMS},
            async (error, user) => {
              if (error) {
                console.log('login info has error: ', error);
              } else {
                console.log(JSON.stringify(user));
                const fcmToken = await getAsyncData(constants.asyncFcmToken);
                response({
                  provider_id: user?.id,
                  provider_name: constants.facebook,
                  email: user?.email,
                  full_name: user?.name,
                  social_account_token: accessToken,
                  device_token: fcmToken,
                  device_type:
                    Platform.OS === 'android'
                      ? 1
                      : Platform.OS === 'ios'
                      ? 2
                      : 0,
                });
              }
            },
          );
          new GraphRequestManager().addRequest(profileRequest).start();
        }
      }
    } catch (err) {
      console.log('ERROR IS: ' + JSON.stringify(err));
      reject(err);
    }
  });
};

export const socialLoginAPI = async (payload: any) => {
  try {
    dispatch(setIsLoading(true));

    const res = await post(constants.endPtSocialLogin, payload);

    if (res?.status === constants.apiSuccess) {
      successToast(res?.message, '', 'top');
      dispatch(setProfileData(res.data));
      setAsyncData(constants.userData, res.data);
      if (res.data.profile_status === 1) {
        setAsyncData(constants.isUploadStart, true);
        dispatch(setIsUploadStart(true));
      } else {
        setAsyncData(constants.isUploadStart, false);
        dispatch(setIsUploadStart(false));
      }
    } else {
      errorToast(res?.message, '', 'top');
    }
    dispatch(setIsLoading(false));
  } catch (err) {
    console.log('ERROR IS: ' + JSON.stringify(err));
    dispatch(setIsLoading(false));
  }
};

export const userTypeUpdateAPI = async (data: any) => {
  try {
    dispatch(setIsLoading(true));
    const res = await post(constants.endPtUserTypeUpdate, data);
    if (res?.status === constants.apiSuccess) {
      const profileData = await getAsyncData(constants.userData);
      const updatedProfileData = {
        ...profileData,
        user_type_name: res.data.user_type_name,
        user_type: res.data.user_type,
      };
      setAsyncData(constants.userData, updatedProfileData);
      dispatch(setProfileData(updatedProfileData));
    } else {
      errorToast(res?.message, '', 'top');
    }
    dispatch(setIsLoading(false));
  } catch (err) {
    console.log('API ERROR', err);
    dispatch(setIsLoading(false));
  }
};

export const doctorDocumentVerificationAPI = async (data: any) => {
  const formData = new FormData();

  data.map((ele: any) => {
    formData.append('files[]', ele);
  });

  try {
    dispatch(setIsLoading(true));
    const res = await post(
      constants.endPtDoctorDocumentVerification,
      formData,
      constants.formData,
    );

    if (res?.status === constants.apiSuccess) {
      successToast(res.message, '', 'top');
    } else {
      errorToast(res?.message, '', 'top');
    }
    dispatch(setIsLoading(false));
  } catch (err) {
    console.log('API ERROR', err);
    dispatch(setIsLoading(false));
  }
};

export const checkVerificationStatusAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtDoctorDocumentVerificationStatus)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setVerificationStatus(res));
        if (res.data.profile_status === 1) {
          const profileData = await getAsyncData(constants.userData);
          const updatedProfileData = {
            ...profileData,
            profile_status: 1,
          };
          setAsyncData(constants.userData, updatedProfileData);
          dispatch(setProfileData(updatedProfileData));
        }
      } else {
        errorToast(res?.message, '', 'top');
      }
      dispatch(setIsLoading(false));
    })
    .catch(e => {
      console.log('API ERROR', e);
      dispatch(setIsLoading(false));
    });
};

export const changePasswordAPI = async (data: any) => {
  const formData = new FormData();

  formData.append('old_password', data.old_password);
  formData.append('new_password', data.new_password);

  try {
    dispatch(setIsLoading(true));
    const res = await post(
      constants.endPtChangePassword,
      formData,
      constants.formData,
    );

    if (res?.status === constants.apiSuccess) {
      successToast(res.message, '', 'top');
      dispatch(setIsLoading(false));
      return 1;
    } else {
      errorToast(res?.message, '', 'top');
      dispatch(setIsLoading(false));
      return 0;
    }
  } catch (err) {
    console.log('API ERROR', err);
    dispatch(setIsLoading(false));
  }
};

export const profileDataApi = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtUserProfile)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        const profileData = await getAsyncData(constants.userData);
        const updatedProfileData = {
          ...profileData,
          user_type: res.data.user_type,
          user_type_name: res.data.user_type_name,
          category_id: res.data.category_id,
          full_name: res.data.full_name,
          email: res.data.email,
          country_code: res.data.country_code,
          calling_code: res.data.calling_code,
          mobile: res.data.mobile,
          profile_image: res.data.profile_image,
          total_credit: res.data.total_credit,
          real_credit: res.data.real_credit,
          bonus_credit: res.data.bonus_credit,
          total_deposit: res.data.total_deposit,
          total_withdraw: res.data.total_withdraw,
          total_buy: res.data.total_buy,
          about_me: res.data.about_me,
          company_name: res.data.company_name,
          gender: res.data.gender,
          lat: res.data.lat,
          lng: res.data.lng,
          date_of_birth: res.data.date_of_birth,
          status: res.data.status,
          profile_status: res.data.profile_status,
          is_profile_completed: res.data.is_profile_completed,
          last_login: res.data.last_login,
          created_at: res.data.created_at,
          category: res.data.category,
        };

        setAsyncData(constants.userData, updatedProfileData);
        dispatch(setProfileData(updatedProfileData));
      } else {
        errorToast(res?.message, '', 'top');
      }
      dispatch(setIsLoading(false));
    })
    .catch(e => {
      console.log('API ERROR', e);
      dispatch(setIsLoading(false));
    });
};

export const updateProfileAPI = (data: any) => {
  const formData = new FormData();
  dispatch(setIsLoading(true));
  formData.append('full_name', data.full_name);
  formData.append('email', data.email);
  formData.append('mobile', data.mobile);
  formData.append('country_code', data.country_code);
  formData.append('gender', data.gender);
  formData.append('date_of_birth', data.date_of_birth);
  formData.append('category', data.category_id);
  formData.append('about_me', data.about_me);
  formData.append('company_name', data.company_name);
  if (data.profile_image) {
    formData.append('profile_image', data.profile_image);
  }

  post(constants.endPtUpdateProfile, formData, constants.formData)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        successToast(res.message, '', 'top');
        const profileData = await getAsyncData(constants.userData);
        const updatedProfileData = {
          ...profileData,
          user_type: res.data.user_type,
          user_type_name: res.data.user_type_name,
          category_id: res.data.category_id,
          full_name: res.data.full_name,
          email: res.data.email,
          country_code: res.data.country_code,
          calling_code: res.data.calling_code,
          mobile: res.data.mobile,
          profile_image: res.data.profile_image,
          total_credit: res.data.total_credit,
          real_credit: res.data.real_credit,
          bonus_credit: res.data.bonus_credit,
          total_deposit: res.data.total_deposit,
          total_withdraw: res.data.total_withdraw,
          total_buy: res.data.total_buy,
          about_me: res.data.about_me,
          company_name: res.data.company_name,
          gender: res.data.gender,
          lat: res.data.lat,
          lng: res.data.lng,
          date_of_birth: res.data.date_of_birth,
          status: res.data.status,
          profile_status: res.data.profile_status,
          is_profile_completed: res.data.is_profile_completed,
          last_login: res.data.last_login,
          created_at: res.data.created_at,
          category: res.data.category,
        };

        setAsyncData(constants.userData, updatedProfileData);
        dispatch(setProfileData(updatedProfileData));
      } else {
        errorToast(res?.message, '', 'top');
      }
      dispatch(setIsLoading(false));
    })
    .catch(e => {
      console.log('API ERROR', e);
      dispatch(setIsLoading(false));
    });
};

export const fcmAddApi = async (payload: any) => {
  dispatch(setIsLoading(true));
  post(constants.endPtFcm, payload)
    .then(res => {
      if (res?.status === constants.apiSuccess) {
      } else {
        errorToast(res?.message, '', 'bottom');
      }
      dispatch(setIsLoading(false));
    })
    .catch(e => {
      console.log('API ERROR', e);
      dispatch(setIsLoading(false));
    });
};
