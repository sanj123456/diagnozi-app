import {constants, errorToast, successToast} from '../core';
import {dispatch} from '../redux';
import {setIsLoading} from '../redux/modules/genericSlice';
import {creditAPI} from './commonServices';
import {post} from './request';

export const paymentStripeAPI = (data: any): Promise<any> => {
  return new Promise((response, reject) => {
    post(constants.endPtStripeDeposit, data)
      .then(res => {
        response(res.data);
        if (res.exception) {
          errorToast(res?.message, '', 'top');
          dispatch(setIsLoading(false));
        }
      })
      .catch(e => {
        console.log('API ERROR', e);
        dispatch(setIsLoading(false));
        reject(e);
      });
  });
};

export const subscribeStripeAPI = (data: any): Promise<any> => {
  return new Promise((response, reject) => {
    post(constants.endPtStripeBuy, data)
      .then(res => {
        response(res);
        if (res.exception) {
          errorToast(res?.message, '', 'top');
          dispatch(setIsLoading(false));
        }
      })
      .catch(e => {
        console.log('API ERROR', e);
        dispatch(setIsLoading(false));
        reject(e);
      });
  });
};

export const paymentPayPalAPI = (data: any): Promise<any> => {
  return new Promise((response, reject) => {
    post(constants.endPtPayPalDeposit, data)
      .then(res => {
        response(res.data);
        if (res.exception) {
          errorToast(res?.message, '', 'top');
          dispatch(setIsLoading(false));
        }
      })
      .catch(e => {
        console.log('API ERROR', e);
        dispatch(setIsLoading(false));
        reject(e);
      });
  });
};

export const callbackPayPalAPI = (data: any): Promise<any> => {
  dispatch(setIsLoading(true));
  return new Promise((response, reject) => {
    post(constants.endPtCallBackPayPal, data)
      .then(res => {
        console.log(res);
        if (res?.status === constants.apiSuccess) {
          successToast(res.message, '', 'top');
          dispatch(setIsLoading(false));
          creditAPI();
          response(res);
        } else {
          reject(res);
          if (res.exception) {
            errorToast(res?.message, '', 'top');
            dispatch(setIsLoading(false));
          }
        }
      })
      .catch(e => {
        console.log('API ERROR', e);
        dispatch(setIsLoading(false));
        reject(e);
      });
  });
};

export const subscribePayPalAPI = (data: any): Promise<any> => {
  return new Promise((response, reject) => {
    post(constants.endPtPayPalBuy, data)
      .then(res => {
        response(res);
        if (res.exception) {
          errorToast(res?.message, '', 'top');
          dispatch(setIsLoading(false));
        }
      })
      .catch(e => {
        console.log('API ERROR', e);
        dispatch(setIsLoading(false));
        reject(e);
      });
  });
};
