import {take, put} from 'redux-saga/effects';

export const fetchTrendingRequest = () => {
  return (dispatch) => {
    dispatch({
      type: 'test',
      payload: {},
    })
  }
}

export const fetchTrending = (trendings) => {
  return {
    type: 'test',
    trendings,
  }
}

const getUserProfileApi = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userId,
        useName: 'NhatPA',
      });
    }, 500);
  });
};

const getUserTimelineApi = (userId, userName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userId,
        userName,
        timelien: [
          {x: 1},
          {x: 2}
        ]
      });
    }, 500);
  });
}

// Sử dụng thunk khi cần gọi api liên tiếp và làm 1 việc gì đó
export const getProfile = (userId) => {
  return async (dispatch, getState, extraArgument) => {
    const userProfile = await getUserProfileApi(userId);
    dispatch({
      type: 'GET_USER_PROFILE_SUCCESS',
      payload: userProfile,
    });
    beforeGetUserTimeline(dispatch);
    dispatch(getUserTimeline(userId, userProfile.userName))
  };
};

const beforeGetUserTimeline = (dispatch) => {
  doSomething(dispatch);
}

const doSomething = (dispatch) => {
  // Do something
  dispatch({
    type: 'DO_SOMETHING',
  });
}

export const getUserTimeline = (userId, useName) => {
  return async (dispatch) => {
    const userTimeline = await getUserTimelineApi(userId, useName);
    dispatch({
      type: 'GET_USER_TIMELINE_SUCCESS',
      payload: userTimeline,
    });
  };
};

// Redux saga
export const getUserProfile = (dispatch, userId, useName) => {
  dispatch({
    type: 'GET_USER_PROFILE',
    payload: {
      userId,
    },
  });
};

async function* takeGetUserProfile() {
  while(true) {
    const action =  yield take('GET_USER_PROFILE');
    const {userId} = action.payload;
    const userTimeline = await getUserProfileApi(userId);
    put({
      type: 'GET_USER_TIMELINE_SUCCESS',
      payload: userTimeline,
    });
  }
}

const beforeGetUserTimelineSage = () => {
  // Do something
  put({
    type: 'DO_SOMETHING',
  })
}

async function* takeUserProfileSuccess() {
  while(true) {
    const action =  yield take('GET_USER_PROFILE_SUCCESS');
    const {userId, userName} = action.payload;
    beforeGetUserTimelineSage();
    const userTimeline = await getUserTimelineApi(userId);
    put({
      type: 'GET_USER_TIMELINE_SUCCESS',
      payload: userTimeline,
    });
  }
}

const afterGetUserTimelineSage = () => {};

async function* takeUserTimelineSuccess() {
  while(true) {
    const action =  yield take('GET_USER_TIMELINE_SUCCESS');
    const {userId, userName, userTimeline} = action;
    afterGetUserTimelineSage();
    put({
      type: 'AFTER_GET_USER_TIMELINE_SUCCESS',
      payload: userTimeline,
    });
  }
}