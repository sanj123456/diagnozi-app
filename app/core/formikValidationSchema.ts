import {object, string, ref, number, boolean} from 'yup';
import {strings} from '../i18n';
import {regex} from './constants';

export const loginValidationSchema = object({
  email: string()
    .trim()
    .required(strings.emailRequired)
    .email(strings.emailVal)
    .matches(regex.email, strings.emailInvalid),
  password: string().trim().required(strings.passwordRequired),
});

export const registerValidationSchema = object().shape({
  user_type: number().required('user_type required'),
  fullName: string()
    .trim()
    .required(strings.fullNameRequired)
    .min(3, strings.atleast3Chars)
    .matches(regex.notNumber, strings.fullNameNotContainNumbers),
  email: string()
    .trim()
    .required(strings.emailRequired)
    .email(strings.emailVal)
    .matches(regex.email, strings.emailInvalid),
  callingCode: string().trim().required(strings.callingCodeRequired),
  gender: string().trim().required(strings.genderRequired),

  phoneNo: string()
    .required(strings.phoneNoRequired)
    .matches(regex.phoneNumber, strings.phoneNoInvalid)
    .min(10, strings.phoneNoAtleast10),
  password: string()
    .trim()
    .required(strings.passwordRequired)
    .matches(regex.password, strings.passwordInvalid)
    .matches(regex.notSpace, strings.passwordSpaceVal),

  confirmPassword: string()
    .trim()
    .required(strings.confirmPasswordRequired)
    .oneOf([ref('password')], strings.confirmPasswordVal),

  dateOfBirth: string().when('user_type', {
    is: 4,
    then: schema => schema.trim().required(strings.dobRequired),
  }),

  category: string().when('user_type', {
    is: 3,
    then: schema => schema.trim().nullable().required(strings.categoryRequired),
  }),

  hospitalName: string().when('user_type', {
    is: 3,
    then: schema =>
      schema
        .trim()
        .min(3, strings.atleast3Chars)
        .required(strings.hospitalNameRequired),
  }),
});

export const changePasswordSchema = object({
  currentPassword: string()
    .trim()
    .required(strings.currentPasswordRequired)
    .matches(regex.password, strings.passwordInvalid)
    .matches(regex.notSpace, strings.passwordSpaceVal),
  password: string()
    .trim()
    .required(strings.passwordRequired)
    .matches(regex.password, strings.passwordInvalid)
    .matches(regex.notSpace, strings.passwordSpaceVal)
    .notOneOf([ref('currentPassword')], strings.notSamePasswordVal),
  confirmPassword: string()
    .trim()
    .required(strings.confirmPasswordRequired)
    .oneOf([ref('password')], strings.confirmPasswordVal),
});

export const userAddPhotoFormSchema = object({
  category: string().trim().required(strings.categoryRequired),
  title: string().trim().required(strings.titleRequired),
  body: string().trim().required(strings.bodyRequired),
});

export const walletFormSchema = object({
  amount: number()
    .positive(strings.onlyNumbersAllowed)
    .min(1, strings.amountMorethanOne)
    .test(
      'numbers',
      strings.onlyNumbersAllowed,
      (value: any) => !value || /^[0-9]+$/.test(value),
    )
    .test(
      'lessThanTen',
      strings.amountMaxLimit,
      value => !value || value.toString().length < 10,
    )
    .required(strings.amountRequired),
  paymentMethod: string().required(strings.paymentMethodRequired),
});

export const EditProfileValidationSchema = object().shape({
  user_type: number().required('user_type required'),
  full_name: string()
    .trim()
    .required(strings.fullNameRequired)
    .min(3, strings.atleast3Chars)
    .matches(regex.notNumber, strings.fullNameNotContainNumbers),
  email: string()
    .trim()
    .required(strings.emailRequired)
    .email(strings.emailVal)
    .matches(regex.email, strings.emailInvalid),
  country_code: string().trim().required(strings.callingCodeRequired),
  gender: string().trim().required(strings.genderRequired),

  mobile: string()
    .required(strings.phoneNoRequired)
    .matches(regex.phoneNumber, strings.phoneNoInvalid)
    .min(10, strings.phoneNoAtleast10),

  // date_of_birth: string().trim().required(strings.dobRequired),
  date_of_birth: string().when('user_type', {
    is: 4,
    then: schema => schema.trim().required(strings.dobRequired),
  }),
  about_me: string().when('user_type', {
    is: 3,
    then: schema => schema.trim().required(strings.aboutMeRequired),
  }),

  category_id: string().when('user_type', {
    is: 3,
    then: schema => schema.trim().required(strings.categoryRequired),
  }),

  company_name: string().when('user_type', {
    is: 3,
    then: schema =>
      schema
        .trim()
        .min(3, strings.atleast3Chars)
        .required(strings.hospitalNameRequired),
  }),
});

export const withdrawRequestSchema = object({
  withdrawRequest: string().trim().required(strings.withdrawRequestRequired),
  reason: string().trim().required(strings.reasonRequired),
});

export const subscriptionFormSchema = object({
  use_wallet: boolean(),
  paymentMethod: string().required(strings.paymentMethodRequired),
});
