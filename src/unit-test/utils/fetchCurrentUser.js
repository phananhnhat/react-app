import request from './request';

export default (resolve, reject) => {
  return request(`/currentUser`).then(user => resolve(user));
};
