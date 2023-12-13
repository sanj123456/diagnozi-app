import {errorToast, successToast} from './../core/genericUtils';
import {constants} from '../core';
import {deleteRequest, get, post} from './request';
// import {strings} from '../i18n';
// import {getAsyncData, removeAsyncData, setAsyncData} from './asyncServices';
import {dispatch, getStore} from '../redux';
import {
  setCategoryData,
  setCountriesData,
  setFeedDetail,
  setIsLoading,
  setQuestions,
  setReferralValue,
  setCreditValue,
  setComment,
  setWithoutSubscription,
  setMembership,
  setTransaction,
  setWithdrawHistory,
  setProfile,
  setWithoutSubscriptionError,
  setSubscriptionHistoryError,
  setNotificationCount,
} from '../redux/modules/genericSlice';

import {
  setMyValueCurrentPage,
  setMyValueData,
  setMyValueIsRefreshing,
  setMyValueLastPage,
  setMyValueLoadMore,
  setMyValueMessage,
} from '../redux/modules/MyValueSlice';
import {
  setDiscoverCurrentPage,
  setDiscoverData,
  setDiscoverIsRefreshing,
  setDiscoverLastPage,
  setDiscoverLoadMore,
  setDiscoverMessage,
} from '../redux/modules/DiscoverSlice';
import {
  resetSubscriptioHistory,
  setSubscriptioHistory,
  setSubscriptioHistoryLoading,
  setSubscriptioHistoryLoadingMore,
} from '../redux/modules/subscriptionHistorySlice';
import {
  setFeedCurrentPage,
  setFeedData,
  setFeedIsRefreshing,
  setFeedLastPage,
  setFeedLoadMore,
  setFeedMessage,
} from '../redux/modules/FeedSlice';
import {
  resetComments,
  setComments,
  setCommentsLoading,
  setCommentsLoadingMore,
} from '../redux/modules/CommentSlice';
import {
  resetNotifications,
  setNotifications,
  setNotificationsLoading,
  setNotificationsLoadingMore,
} from '../redux/modules/notificationsSlice';
import {
  resetRatings,
  setRatings,
  setRatingsLoading,
  setRatingsLoadingMore,
} from '../redux/modules/ratingsSlice';
import {strings} from '../i18n';
// import {deleteRequest} from './request';

export const countriesAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtCountries)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        const array = <any>[];
        res.data.map((item: any) =>
          array.push({
            label: `${item.name}(${item.callingcode})`,
            value: item.code,
          }),
        );
        dispatch(setCountriesData(array));
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};

export const categoryAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtCategory)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        const array = <any>[];
        res.data.map((item: any) =>
          array.push({
            label: `${item.title}`,
            value: `${item.id}`,
          }),
        );
        dispatch(setCategoryData(array));
      } else {
        console.log('AT category');
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};

export const feedAPI = (
  page: any,
  type?: 'refreshing' | 'load_more' | 'isLoading',
  data?: any,
  category_id?: any,
) => {
  if (type === 'isLoading') {
    dispatch(setIsLoading(true));
  }
  if (type === 'refreshing') {
    dispatch(setFeedIsRefreshing(true));
  }
  if (type === 'load_more') {
    dispatch(setFeedLoadMore(true));
  }
  get(constants.endPtFeed, {page: page, category_id})
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setFeedData(res.data));

        if (type === 'load_more') {
          dispatch(setFeedData([...data, ...res?.data]));
          dispatch(setFeedLoadMore(false));
        } else {
          dispatch(setFeedData(res?.data));
          dispatch(setFeedIsRefreshing(false));
        }

        dispatch(setFeedCurrentPage(res.meta.current_page));
        dispatch(setFeedLastPage(res.meta.last_page));
      } else {
        if (res?.code === 401) {
          console.log('ERROR MESSAGE :: ', res.message);
          dispatch(setFeedMessage(res?.message));
        } else {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
      dispatch(setFeedIsRefreshing(false));
      dispatch(setFeedLoadMore(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};

export const myValueAPI = (
  page: any,
  type?: 'refreshing' | 'load_more' | 'isLoading',
  data?: any,
) => {
  if (type === 'isLoading') {
    dispatch(setIsLoading(true));
  }
  if (type === 'refreshing') {
    dispatch(setMyValueIsRefreshing(true));
  }
  if (type === 'load_more') {
    dispatch(setMyValueLoadMore(true));
  }

  get(constants.endPtMyValue, {page: page})
    .then(async res => {
      console.log('res.DATA ABCD ::   ', res.data);
      if (res?.status === constants.apiSuccess) {
        if (type === 'load_more') {
          dispatch(setMyValueData([...data, ...res?.data]));
          dispatch(setMyValueLoadMore(false));
        } else {
          dispatch(setMyValueData(res?.data));
          dispatch(setMyValueIsRefreshing(false));
        }

        dispatch(setMyValueCurrentPage(res.meta.current_page));
        dispatch(setMyValueLastPage(res.meta.last_page));
      } else {
        if (res?.code === 401) {
          console.log('ERROR MESSAGE  AT MY VALUES :: ', res.message);
          dispatch(setMyValueData(res?.data));
          dispatch(setMyValueMessage(res?.message));
        } else {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
      dispatch(setMyValueIsRefreshing(false));
      dispatch(setMyValueLoadMore(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
      dispatch(setMyValueIsRefreshing(false));
      dispatch(setMyValueLoadMore(false));
    });
};
export const discoverAPI = (
  page: any,
  type?: 'refreshing' | 'load_more' | 'isLoading',
  data?: any,
) => {
  if (type === 'isLoading') {
    dispatch(setIsLoading(true));
  }
  if (type === 'refreshing') {
    dispatch(setDiscoverIsRefreshing(true));
  }
  if (type === 'load_more') {
    dispatch(setDiscoverLoadMore(true));
  }

  get(constants.endPtDiscover, {page: page})
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        if (type === 'load_more') {
          dispatch(setDiscoverData([...data, ...res?.data]));
        } else {
          dispatch(setDiscoverData(res?.data));
        }

        dispatch(setDiscoverLoadMore(false));
        dispatch(setDiscoverIsRefreshing(false));
        dispatch(setDiscoverCurrentPage(res.meta.current_page));
        dispatch(setDiscoverLastPage(res.meta.last_page));
      } else {
        if (res?.code == 401) {
          dispatch(setDiscoverMessage(res?.message));
        } else {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
      dispatch(setDiscoverIsRefreshing(false));
      dispatch(setDiscoverLoadMore(false));
    });
};

export const feedDetailAPI = (params: {service_order_id: string}) => {
  dispatch(setIsLoading(true));
  get(constants.endPtFeedDetail, params)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setFeedDetail(res.data));
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};
export const feedOrderCommentAPI = (
  params: {service_order_id: string},
  page: any,
) => {
  if (page == 1) {
    dispatch(setCommentsLoading(true));
  }
  get(constants.endPtFeedOrderComment, {...params, page})
    .then(async res => {
      if (res?.meta?.current_page === res?.meta?.last_page) {
        dispatch(setCommentsLoadingMore(false));
      }
      if (res.exception) {
        errorToast(strings.somethingWentToWrongs, '', 'top');
      } else {
        dispatch(setComments(res));
        if (res?.status != constants.apiSuccess && res?.code != 404) {
          errorToast(res?.message, '', 'top');
        }
      }
      // dispatch(setIsLoading(false));
      dispatch(setCommentsLoading(false));
    })
    .catch(_e => {
      // dispatch(setIsLoading(false));
      dispatch(setCommentsLoading(false));
      dispatch(resetComments());
    });
};

export const deleteCommentAPI = (data: any) => {
  dispatch(setIsLoading(true));
  deleteRequest(constants.endPtDeleteComment, {comment_id: data.commentId})
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        successToast(res?.message, '', 'top');
        feedOrderCommentAPI({service_order_id: data.service_order_id}, 1);
        dispatch(setComment(null));
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};

export const addCommentAPI = (data: any) => {
  dispatch(setIsLoading(true));
  // return;
  post(constants.endPtAddComment, data)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        console.log('comment addd.... ', res.data);
        dispatch(setComment(null));
        successToast(res?.message, '', 'top');
        feedOrderCommentAPI({service_order_id: data.service_order_id}, 1);
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};

export const updateCommentAPI = (values: any) => {
  const formData = new FormData();
  formData.append('comment_id', values.data.id);
  formData.append('message', values.data.text);
  dispatch(setIsLoading(true));
  // return;
  post(constants.endPtUpdateComment, formData, constants.formData)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        console.log('comment addd.... ', res.data);
        successToast(res?.message, '', 'top');
        feedOrderCommentAPI({service_order_id: values.service_order_id}, 1);
        dispatch(setComment(null));
      } else {
        console.log('ER', res);
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      console.log('ER CACTCh ::', _e);
      dispatch(setIsLoading(false));
    });
};

export const replyCommentAPI = (values: any) => {
  dispatch(setIsLoading(true));
  const formData = new FormData();

  formData.append('service_order_id', values.service_order_id);
  formData.append('parent_id', values.data.id);
  formData.append('message', values.data.text);
  // return;
  post(constants.endPtAddComment, formData, constants.formData)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        successToast(res?.message, '', 'top');
        feedOrderCommentAPI({service_order_id: values.service_order_id}, 1);
        dispatch(setComment(null));
      } else {
        console.log('ER', res);
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      console.log('ER CACTCh ::', _e);
      dispatch(setIsLoading(false));
    });
};

export const feedquestionsAPI = (params: {category_id: any}) => {
  dispatch(setIsLoading(true));
  get(constants.endPtFeedQuestions, params)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setQuestions(res.data));
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};

export const orderVoteAPI = (data: any) => {
  dispatch(setIsLoading(true));
  post(constants.endPtVote, data)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        successToast(res?.message, '', 'top');
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};
export const ratingListAPI = (params: {
  category_id?: string | null;
  page: number;
}) => {
  console.log('params', params);
  if (params.page == 1) {
    dispatch(setRatingsLoading(true));
  }
  get(constants.endPtRating, params)
    .then(async res => {
      if (res?.meta?.current_page === res?.meta?.last_page) {
        dispatch(setRatingsLoadingMore(false));
      }
      if (res.exception) {
        errorToast(strings.somethingWentToWrongs, '', 'top');
      } else {
        dispatch(setRatings(res));
        if (res?.status != constants.apiSuccess && res?.code != 404) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setRatingsLoading(false));
    })
    .catch(_e => {
      dispatch(setRatingsLoading(false));
      dispatch(resetRatings());
    });
};
export const referralAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtReferral)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setReferralValue(res.data));
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};
export const creditAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtUserCredit)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setCreditValue(res.data));
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};
export const userProfileAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtUserProfile)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setProfile(res.data));
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};
export const createOrderAPI = async (data: any) => {
  const formData = new FormData();

  formData.append('category_id', data.category);
  formData.append('title', data.title);
  formData.append('description', data.body);
  data.images.map((ele: any) => {
    formData.append('files', ele);
  });
  try {
    dispatch(setIsLoading(true));
    const res = await post(
      constants.endPtCreateOrder,
      formData,
      constants.formData,
    );

    if (res?.status === constants.apiSuccess) {
      successToast(res.message, '', 'top');
      dispatch(setIsLoading(false));
      return 1;
    } else {
      if (res?.message !== constants.error1) {
        errorToast(res?.message, '', 'top');
      }
      dispatch(setIsLoading(false));
      return 0;
    }
  } catch (err) {
    console.log('API ERROR', err);
    dispatch(setIsLoading(false));
  }
};
export const subscriptionshistoryAPI = (page: number) => {
  // dispatch(setIsLoading(true));
  if (page == 1) {
    dispatch(setSubscriptioHistoryLoading(true));
  }
  get(constants.endPtSubscriptionHistory, {page})
    .then(async res => {
      dispatch(setSubscriptionHistoryError(''));
      if (res?.meta?.current_page === res?.meta?.last_page) {
        dispatch(setSubscriptioHistoryLoadingMore(false));
      }
      if (res.exception) {
        errorToast(strings.somethingWentToWrongs, '', 'top');
      } else {
        dispatch(setSubscriptioHistory(res));
        if (res?.status != constants.apiSuccess) {
          if (res?.code == 401) {
            dispatch(setSubscriptionHistoryError(res?.message));
          } else {
            errorToast(res?.message, '', 'top');
          }
        }
      }
      // dispatch(setIsLoading(false));
      dispatch(setSubscriptioHistoryLoading(false));
    })
    .catch(_e => {
      // dispatch(setIsLoading(false));
      dispatch(setSubscriptioHistoryLoading(false));
      dispatch(resetSubscriptioHistory());
    });
};
export const subscriptionsWithoutPackageAPI = () => {
  // dispatch(setIsLoading(true));
  get(constants.endPtSubscriptionWithoutPackage)
    .then(async res => {
      dispatch(setWithoutSubscriptionError(''));
      if (res?.status === constants.apiSuccess) {
        dispatch(setWithoutSubscription(res.data));
      } else {
        if (res?.code == 401) {
          dispatch(setWithoutSubscriptionError(res?.message));
        } else {
          errorToast(res?.message, '', 'top');
        }
      }
      // dispatch(setIsLoading(false));
    })
    .catch(_e => {
      // dispatch(setIsLoading(false));
    });
};
export const membershipAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtMembership)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setMembership(res.data));
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};
export const transactionAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtTransaction)
    .then(async res => {
      dispatch(setIsLoading(false));
      if (res?.status === constants.apiSuccess) {
        dispatch(setTransaction(res.data));
      } else {
        if (
          res.message === constants.error1 ||
          res.message === 'Payment not found.'
        ) {
          return;
        }
        console.log('TRANS API :: >>> ', res);
        errorToast(res?.message, '', 'top');
      }
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};
export const withdrawHistoryAPI = () => {
  dispatch(setIsLoading(true));
  get(constants.endPtWithdrawHistory)
    .then(async res => {
      dispatch(setIsLoading(false));
      if (res?.status === constants.apiSuccess) {
        dispatch(setWithdrawHistory(res.data));
      } else {
        console.log('REaaaa :: ', res.message);
        if (
          res?.message === constants.error1 ||
          res.message === 'Withdraw request not found.'
        ) {
          return;
        }
        errorToast(res?.message, '', 'top');
      }
    })
    .catch(_e => {
      dispatch(setIsLoading(false));
    });
};

export const updateOrderAPI = async (data: any) => {
  const formData = new FormData();
  dispatch(setIsLoading(true));
  formData.append('service_order_id', data.service_order_id);
  formData.append('category_id', data.category);
  formData.append('title', data.title);
  formData.append('description', data.body);
  if (data.newImages) {
    data.newImages.map((ele: any) => formData.append('files[]', ele));
  }
  if (data.deletedImages) {
    data.deletedImages.map((ele: any) =>
      formData.append('deleted_images_ids[]', ele),
    );
  }

  try {
    const res = await post(
      constants.endPtUpdateOrder,
      formData,
      constants.formData,
    );
    if (res?.status === constants.apiSuccess) {
      successToast(res.message, '', 'top');
      dispatch(setIsLoading(false));
      return 1;
    } else {
      if (res?.message !== constants.error1) {
        errorToast(res?.message, '', 'top');
      }
      dispatch(setIsLoading(false));
      return 0;
    }
  } catch (err) {
    console.log('API ERROR', err);
    dispatch(setIsLoading(false));
  }
};
export const deleteOrderAPI = async (id: any) => {
  dispatch(setIsLoading(true));
  try {
    const res = await deleteRequest(constants.endPtDeleteOrder, {
      service_order_id: id,
    });
    if (res?.status === constants.apiSuccess) {
      successToast(res?.message, '', 'top');

      myValueAPI(1, 'isLoading');
      dispatch(setComment(null));
      dispatch(setIsLoading(false));
      return 1;
    } else {
      if (res?.message !== constants.error1) {
        errorToast(res?.message, '', 'top');
      }
      dispatch(setIsLoading(false));
      return 1;
    }
  } catch (_e) {
    dispatch(setIsLoading(false));
  }
};

export const withdrawRequestAPI = async (data: any) => {
  try {
    dispatch(setIsLoading(true));
    const res = await post(constants.endPtWithdrawRequest, data);
    dispatch(setIsLoading(false));
    if (res?.status === constants.apiSuccess) {
      successToast(res.message, '', 'top');
      return 1;
    } else {
      errorToast(res?.message, '', 'top');
      return 0;
    }
  } catch (_e) {
    console.log('API ERROR', _e);
    dispatch(setIsLoading(false));
  }
};

export const notifcationListAPI = (page: number) => {
  if (page == 1) {
    dispatch(setNotificationsLoading(true));
  }
  get(constants.endPtNotification, {page})
    .then(async res => {
      if (res?.meta?.current_page === res?.meta?.last_page) {
        dispatch(setNotificationsLoadingMore(false));
      }
      if (res.exception) {
        errorToast(strings.somethingWentToWrongs, '', 'top');
      } else {
        dispatch(setNotifications(res));
        if (res?.status != constants.apiSuccess && res?.code != 404) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setNotificationsLoading(false));
    })
    .catch(_e => {
      dispatch(setNotificationsLoading(false));
      dispatch(resetNotifications());
    });
};

export const readNotificationAPI = async (data?: any) => {
  try {
    dispatch(setIsLoading(true));
    await post(constants.endPtReadNotification, data);
    notificationCountAPI();
    dispatch(setIsLoading(false));
  } catch (_e) {
    console.log('API ERROR', _e);
    dispatch(setIsLoading(false));
  }
};

export const deleteNotificationAPI = (id: any) => {
  dispatch(setIsLoading(true));
  deleteRequest(constants.endPtDeleteNotification, {notification_id: id})
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        const meta = getStore().notifications.meta;
        notifcationListAPI(+meta.current_page);
        successToast(res?.message, '', 'top');
      } else {
        if (res?.message !== constants.error1) {
          errorToast(res?.message, '', 'top');
        }
      }
      dispatch(setIsLoading(false));
    })
    .catch(_e => {
      console.log('API ERROR', _e);
      dispatch(setIsLoading(false));
    });
};

export const notificationCountAPI = () => {
  get(constants.endPtNotificationCount)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setNotificationCount(+res.unread_count));
      } else {
        errorToast(res?.message, '', 'top');
      }
    })
    .catch(_e => {});
};
