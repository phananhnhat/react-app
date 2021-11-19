import { take, takeMaybe, put, takeEvery, all } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

// TODO take(pattern)
function* _take() {
  while(true) {
    yield take();
    console.log('take with no params')
  }
}

const takeFn = (action) => {
  return action?.payload?.x === 1;
};

function* _takeWithFunction() {
  while(true) {
    console.log(1);
    yield take(takeFn);
    console.log('take with function: action.payload.x === 1')
  }
}

function* _takeWithString() {
  while(true) {
    yield take('giam1');
    console.log('take with string: action.type === giam1')
  }
}

function* _takeWithArray() {
  while(true) {
    yield take(['giam1', takeFn]);
    console.log('take with arr: [\'giam1\', takeFn]')
  }
}

// TODO takeMaybe(pattern) => Chưa rõ cách dùng
// function* _takeMaybe() {
//   while(true) {
//     yield takeMaybe(['giam1', takeFn]);
//     console.log('take with arr: [\'giam1\', takeFn]')
//   }
// }

// TODO takeEvery(pattern) = take + fork
function* _takeEvery() {
  while(true) {
    yield takeEvery(['giam1'], takeEveryFn, 'params1', 'param2');
  }
}

function* takeEveryFn(action, param1, param2) {
  console.log('takeEveryFn call with ' + [param1, param2]);
}


function* incrementAsync() {
  // if(action.payload.)
  yield delay(1000)
  yield put({ type: 'giam1' })
}

function* watchIncrementAsync() {
  yield takeEvery('tang1', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    // incrementAsync(),
    watchIncrementAsync(),
    _take(),
    _takeWithFunction(),
    _takeWithString(),
    _takeWithArray(),
    // _takeEvery(),
  ])
}