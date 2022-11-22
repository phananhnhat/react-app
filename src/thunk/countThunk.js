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

// TODO by NhatPA: Nếu ko dùng redux middleware thì sẽ phải mang hàm dispatch đi khắp mọi nơi nếu muốn dispatch action ở tại trong các funtion con đấy
// TODO by NhatPA: Redux-thunk: Cho phép nhận action là 1 funtion, có thể dùng dispatch(thunk) để tránh phải truyền dispatch đi vào các function con.
// TODO by NhatPA: Hoặc là trong trường hợp bắt buộc phải tách hàm để call nhiều api đồng thời thì cần tách ra các thunk khác nhau
// TODO by NhatPA: Nhược điểm Redux-thunk: cú pháp dài dòng, callback hell khi dùng dispatch(thunk) lồng nhau, ví dụ như ví dụ 2
// TODO by NhatPA: Redux-saga sẽ ko phải xảy ra callback hell, các funtion sẽ được tách biệt với nhau, dễ viết unit test, code sẽ được độc lập hoàn toàn

// TODO: Vi du callback hell trong JS
// const callApi = (data, cb) => {
//   getProfile1(data, (data1) => {
//     // Dosomething 1
//     getProfile2(data1, (data2) => {
//       // Dosomething 2
//       getProfile3(data2, (data3) => {
//         // Dosomething 3
//         cb(data3);
//       });
//     });
//   });
// };
//
// const callApi = (data, cb) => {
//   getProfile1(data, (data1) => {
//     getProfile1Success(data1, cb);
//   });
// };
//
// const getProfile1Success = (data, cb) => {
//   // Dosomething 1
//   getProfile2(data, (data2) => {
//     getProfile2Success(cb);
//   });
// }
//
// const getProfile2Success = (data, cb) => {
//   // Dosomething 2
//   getProfile3(data, (data3) => {
//     getProfile3Success(data3);
//   });
// }
//
// const getProfile3Success = (data3, cb) => {
//   // Dosomething 3
//   cb(data3)
// }

// TODO: Ví dụ callback hell khi dùng redux-thunk
// Sử dụng thunk khi cần gọi api liên tiếp và làm 1 việc gì đó

// TODO : Ví dụ 2
const doSomethingThunk = () => {
  return (dispatch) => {
    const a = calculA(1,23,4);
    dispatch({type: 'SET_A'});
  };
};

const handleFetchData2Thunk = (id) => {
  return (dispatch) => {
    fetData2(id, (response) => {
      dispatch({type: 'FETCH_DATA_2_SUCCESS'});
      dispatch(doSomethingThunk());
    })
  };
}

const handleFetchData1Thunk = (id) => {
  return (dispatch) => {
    fetData1(id, (response) => {
      dispatch({type: 'FETCH_DATA_1_SUCCESS'});
      dispatch(handleFetchData2Thunk(response.id))
    })
  };
}

const handleFetchDataThunk = (id) => {
  return (dispatch) => {
    fetData(id, (response) => {
      dispatch({type: 'FETCH_DATA_SUCCESS'});
      dispatch(handleFetchData1Thunk(response.id))
    });
  };
}

// Nếu kô tách ra các hàm riêng thì thunk sẽ như thế này => callback hell hoặc phải truyền dispatch vào các funtion con (như dưới)
// Các callback khi dùng dispatch sẽ lặp lại liên tục
const handleFetchDataThunk = (id) => {
  return (dispatch) => {
    fetData(id, (response) => {
      dispatch((dispatch1) => {
        dispatch1({type: 'FETCH_DATA_SUCCESS'});
        fetData1(response.id, (response2) => {
          dispatch({type: 'FETCH_DATA_1_SUCCESS'});
          fetData2(response2.id, (respons3) => {
            dispatch({type: 'FETCH_DATA_2_SUCCESS'});
            const a = calculA(1,23,4);
            dispatch({type: 'SET_A'});
          })
        })
      })
    });
  };
}
// Hoặc theo cách dưới đây, chỉ dispatch 1 lần, cái này thì callback hell là do api, cái trên mới là dispatch hell do redux-thunk, nhưng mà cách này là viết tất cả vào 1 hàm nên ko tính
const handleFetchDataThunk = (id) => {
  return (dispatch) => {
    fetData(id, (response) => {
      dispatch({type: 'FETCH_DATA_SUCCESS'});
      fetData1(id, (response) => {
        dispatch({type: 'FETCH_DATA_1_SUCCESS'});
        fetData2(id, (response) => {
          dispatch({type: 'FETCH_DATA_2_SUCCESS'});
          const a = calculA(1,23,4);
          dispatch({type: 'SET_A'});
        });
      })
    });
  };
}


// TODO Ví dụ 2
// export const getProfile = (userId) => {
//   return async (dispatch, getState, extraArgument) => {
//     getUserProfileApi(userId)
//       .then((userProfile) => {
//         dispatch({
//           type: 'GET_USER_PROFILE_SUCCESS',
//           payload: userProfile,
//         });
//         beforeGetUserTimeline(dispatch);
//         dispatch(getUserTimeline(userId, userProfile.userName))
//       });
//   };
// };
//
// export const getUserTimeline = (userId, useName) => {
//   return async (dispatch) => {
//     getUserTimelineApi(userId, useName).then((userTimeline) => {
//       dispatch({
//         type: 'GET_USER_TIMELINE_SUCCESS',
//         payload: userTimeline,
//       });
//     });
//   };
// };

// TODO: Ví dụ async/await khi dùng redux-thunk
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

// TODO: Ví dụ khi sử dụng Redux saga
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
