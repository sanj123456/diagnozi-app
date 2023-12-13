import {constants} from '../core';
import AxiosInstance from './interceptor';

//Post Request
export async function post(api: string, data: any, type?: string) {
  const headerType =
    type === constants.formData
      ? {'content-type': 'multipart/form-data'}
      : {'content-type': 'application/json'};
  return AxiosInstance.post(`${constants.baseUrl}${api}`, data, {
    headers: headerType,
  })
    .then(res => {
      if (res.status === 200 && !res.data.status) {
        return {
          ...res.data,
          status: 'success',
        };
      }
      return res.data;
    })
    .catch(err => (err && err.response ? err.response : err));
}

//Get Request
export async function get(api: string, params?: any) {
  return AxiosInstance.get(api, {
    params: params ?? null,
  })
    .then(res => {
      if (res.status === 200 && !res.data.status) {
        return {
          ...res.data,
          status: 'success',
        };
      }
      return res.data;
    })
    .catch(err => err);
}

//Put Request
export async function put(api: string, data: any) {
  return AxiosInstance.put(`${constants.baseUrl}${api}`, data)
    .then(res => {
      if (res.status === 200 && !res.data.status) {
        return {
          ...res.data,
          status: 'success',
        };
      }
      return res.data;
    })
    .catch(err => err);
}

//Delete Request
export async function deleteRequest(api: string, params?: any) {
  return AxiosInstance.delete(`${constants.baseUrl}${api}`, {
    params: params ?? null,
  })
    .then(res => {
      if (res.status === 200 && !res.data.status) {
        return {
          ...res.data,
          status: 'success',
        };
      }
      return res.data;
    })
    .catch(err => err.response);
}
