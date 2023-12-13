import {errorToast} from './../core';
import {constants} from '../core';
import axios from 'axios';
import {getStore} from '../redux';

// Create Instance
const AxiosInstance = axios.create({
  baseURL: constants.baseUrl,
  timeout: 20000,
  transformRequest: [
    function (data, headers) {
      const profileData = getStore().profile.profileData;
      if (profileData && profileData?.token) {
        headers.Authorization = `Bearer ${profileData?.token}`;
      }
      if (data && data._parts) {
        return data;
      } else {
        return JSON.stringify(data);
      }
    },
  ],
});

// Response Interceptor
AxiosInstance.interceptors.response.use(
  response => {
    // console.log('API response', response);
    if (response?.data?.error_code === 5004) {
      errorToast(response.data.data?.message);
      return response;
    } else {
      return response;
    }
  },
  error => {
    console.log('ERROR::  Please check your internet connection');
    if (!error.response) {
      return Promise.reject({
        status: constants.apiFailure,
        message: 'Please check your internet connection',
      });
    } else {
      return error.response;
    }
  },
);

export default AxiosInstance;
