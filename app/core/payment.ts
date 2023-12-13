import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import {dispatch, getStore} from '../redux';
import {setIsLoading} from '../redux/modules/genericSlice';
import {
  paymentPayPalAPI,
  paymentStripeAPI,
  subscribePayPalAPI,
  subscribeStripeAPI,
} from '../services/paymentService';
import {constants} from './constants';
import {errorToast, successToast} from './genericUtils';
import {strings} from '../i18n';
import {creditAPI} from '../services/commonServices';

export const initializeStripe = async (amount: string) => {
  dispatch(setIsLoading(true));

  const profileData = getStore().profile.profileData;

  const {paymentIntent, ephemeralKey, customer} = await paymentStripeAPI({
    amount,
  });

  const {error} = await initPaymentSheet({
    merchantDisplayName: 'Diagnozi',
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent,
    // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
    //methods that complete payment after a delay, like SEPA Debit and Sofort.
    allowsDelayedPaymentMethods: true,
    defaultBillingDetails: {
      name: profileData.full_name,
    },
  });
  if (!error) {
    // setLoading(true);
  }
};

export const selectPaymentOption = (paymentMethod: string) => {
  return new Promise(async (resolve, reject) => {
    switch (paymentMethod) {
      case constants.stripe:
        const {error} = await presentPaymentSheet();
        dispatch(setIsLoading(false));
        if (error) {
          errorToast(error.message, '', 'top');
          reject(error);
        } else {
          creditAPI();
          successToast(strings.yourPaymentSuccessfully, '', 'top');
          resolve(true);
        }
        break;

      default:
        dispatch(setIsLoading(false));
        errorToast(strings.paymentMethodNotFound, '', 'top');
        reject();
        break;
    }
  });
};

export const initializeSubscriptionStripe = async (
  membership_id: string,
  use_wallet: boolean,
) => {
  dispatch(setIsLoading(true));
  return new Promise(async (resolve, reject) => {
    const profileData = getStore().profile.profileData;

    const {
      is_redirect,
      message,
      data: {paymentIntent, ephemeralKey, customer},
    } = await subscribeStripeAPI({
      membership_id,
      use_wallet: use_wallet ? 1 : 0,
    });

    if (is_redirect == 1) {
      successToast(message, '', 'top');
      dispatch(setIsLoading(false));
      creditAPI();
      resolve(true);
    } else {
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Diagnozi',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: profileData.full_name,
        },
      });
      resolve(false);
      if (!error) {
        // setLoading(true);
        reject(error);
        dispatch(setIsLoading(false));
      }
    }
  });
};

export const initializePayPal = async (amount: string) => {
  dispatch(setIsLoading(true));

  const result = await paymentPayPalAPI({
    amount,
  });
  dispatch(setIsLoading(false));
  return result;
};

export const initializeSubscriptionPayPal = async (
  membership_id: string,
  use_wallet: boolean,
) => {
  dispatch(setIsLoading(true));
  return new Promise<{url: string}>(async (resolve, reject) => {
    try {
      const {
        is_redirect,
        message,
        data: {url},
      } = await subscribePayPalAPI({
        membership_id,
        use_wallet: use_wallet ? 1 : 0,
      });

      console.log(url);

      if (is_redirect == 1) {
        successToast(message, '', 'top');
        dispatch(setIsLoading(false));
        creditAPI();
        resolve({url: ''});
      } else {
        dispatch(setIsLoading(false));
        resolve({url});
      }
    } catch (err) {
      reject(err);
    }
  });
};
