import {requestMultiple} from 'react-native-permissions';

export const RequestPermission = async (permission: any) => {
  const checkPermisionResult = await requestMultiple([...permission]);

  console.log('REQUEST PEMRISON:: ', checkPermisionResult);
  if (Object.values(checkPermisionResult).every(ele => ele === 'denied')) {
    return 0;
  } else if (
    Object.values(checkPermisionResult).every(
      ele => ele === 'granted' || 'limited',
    )
  ) {
    return 1;
  } else if (
    Object.values(checkPermisionResult).every(
      ele => ele === 'blocked' || 'unavailable',
    )
  ) {
    return -1;
  }
};
