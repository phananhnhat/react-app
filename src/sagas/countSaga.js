import {
  take,
  takeMaybe,
  takeLatest,
  put,
  takeEvery,
  all,
  call,
  fork,
  cancel,
  takeLeading,
  spawn,
  select,

} from 'redux-saga/effects'

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

// TODO takeEvery(pattern) = while(true) { take + fork }
function* _takeEvery() {
  yield takeEvery(['giam12'], takeEveryFn, 'a params1', 'a param2');
}

function* takeEveryFn(param1, param2, action) {
  console.log('takeEveryFn call with action: ', action);
  console.log('takeEveryFn call with ' + [param1, param2]);
}

// TODO takeLatest = while(true) { take + fork + cancel}
// TODO: Mỗi khi một hành động được gửi đến cửa hàng. Và nếu hành động này khớp với mẫu, takeLatest sẽ bắt đầu một nhiệm vụ saga mới trong nền.
// TODO: Nếu một nhiệm vụ saga đã được bắt đầu trước đó (trên hành động cuối cùng được gửi trước hành động thực tế) và nếu nhiệm vụ này vẫn đang chạy
// TODO: thì nhiệm vụ sẽ bị hủy.

function* _takeLatest(action) {
  yield takeLatest(['takeLatestAction'], takeLatestFn, 'a params1', 'a param2');
}

function* takeLatestFn(param1, param2, action) {
  console.log('Start takeLatestFn with', [param1, param2]);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param1 + ', ' +param2);
    }, 3000);
  }).then((r) => {
    console.log(r);
  });
}

const takeLatest1 = (patternOrChannel, saga, ...args) => fork(function*() {
  let lastTask;
  while (true) {
    const action = yield take(patternOrChannel)
    if (lastTask) {
      yield cancel(lastTask) // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})

// TODO takeLeading = while(true) { take + call }
// TODO Tạo ra một câu chuyện về mỗi hành động được gửi đến Cửa hàng phù hợp với mẫu.
// TODO Sau khi tạo ra một nhiệm vụ một lần, nó sẽ chặn cho đến khi câu chuyện được tạo ra hoàn thành và sau đó bắt đầu nghe lại một mẫu.

function* _takeLeading(action) {
  yield takeLeading(['takeLeadingFnAction'], takeLeadingFn, 'a params1', 'a param2');
}

const takeLeadingFn = (patternOrChannel, saga, ...args) => fork(function*() {
  let lastTask;
  while (true) {
    const action = yield take(patternOrChannel)
    if (lastTask) {
      yield cancel(lastTask) // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})

const takeLeading1 = (patternOrChannel, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
})

// TODO: put(channel, action)

function* _put() {
  while(true) {
    yield take('putTest')
    yield put({ type: 'giam1' })
    yield put({ type: 'giam1' })
  }
}

// TODO: call(fn, ...args) => Chạy bất đồng bộ các funtion được gọi
// TODO Nếu kết quả là một đối tượng Iterator, phần mềm trung gian sẽ chạy chức năng Generators đó,
// TODO giống như nó đã làm với các Generators (được chuyển cho phần mềm trung gian khi khởi động).
// TODO Trình tạo mẹ sẽ bị tạm ngừng cho đến khi Trình tạo con kết thúc bình thường,
// TODO trong trường hợp đó Trình tạo mẹ được tiếp tục với giá trị được trả về bởi Trình tạo con.
// TODO Hoặc cho đến khi đứa trẻ hủy bỏ với một số lỗi, trong trường hợp đó, một lỗi sẽ được đưa vào bên trong Trình tạo chính.
// TODO: Xem ví dụ dưới để hiểu hơn

// TODO: call([context, fn], ...args)
// TODO: call([context, fnName], ...args)
// TODO: call({context, fn}, ...args)
// TODO: Có thể nổ sung ngữ cảnh this cho function được gọi bằng 3 cách trên

// Khi callGeneratorFn được gọi thì phải chờ action "callGeneratorFnTest" được gửi lên thì mới có thể chạy tiếp
function* callGeneratorFn() {
  yield take('callGeneratorFnTest');
  console.log('callGeneratorFnTest');
  return 'callGeneratorFn';
}

function callPromiseFn() {
  return new Promise((rel, rej) => {
    setTimeout(() => {
      rel('foo');
    }, 3000);
  });
}

function callNormalFn(param) {
  const a = 1;
  const b = 2;
  return a + b + param;
}

function* _call() {
  while (true) {
    yield take('callTest')
    const x = yield call(callNormalFn, 4);
    const y = yield call(callPromiseFn);
    // Khi callGeneratorFn được gọi thì phải chờ callGeneratorFn hoàn thành thì mới kết thúc cái này.
    const z = yield call(callGeneratorFn);
    debugger;
  }
}

// TODO: apply(context, fn, [args]) === call([context, fn], ...args)

// TODO: cps(fn, ...args) => Để bắn lỗi, chưa tìm hiểu cách dùng

// TODO: fork(fn, ...args)
// TODO Tương tự như call nhưng nó không phải chạy bất đồng bộ
// TODO Giống như lệnh call, có thể được sử dụng để gọi cả hàm bình thường và hàm Generator.
// TODO Tuy nhiên, các cuộc gọi không bị chặn, phần mềm trung gian không tạm ngưng Generator trong khi chờ kết quả của fn.
// TODO Thay vào đó, ngay sau khi fn được gọi, Generator sẽ tiếp tục ngay lập tức.
// TODO Kết quả của fork(fn ... args) là một đối tượng Task

// TODO fork([context, fn], ...args)
// TODO fork({context, fn}, ...args)
// TODO: Có thể nổ sung ngữ cảnh this cho function được gọi bằng 3 cách trên

function* _fork() {
  while (true) {
    yield take('forkTest')
    const x = yield fork(callNormalFn, 4);
    const y = yield fork(callPromiseFn);
    // Khi callGeneratorFn được gọi thì không phải chờ callGeneratorFn hoàn thành thì mới kết thúc cái này.
    const z = yield fork(callGeneratorFn);
debugger;
    const ss = spawn(callGeneratorFn)
    debugger;
  }
}

// TODO: spawn(fn, ...args), spawn([context, fn], ...args)
// TODO Tương tự như fork (fn, ... args) nhưng tạo ra một tác vụ riêng biệt.
// TODO Một nhiệm vụ tách rời vẫn độc lập với cha của nó và hoạt động giống như một nhiệm vụ cấp cao nhất.
// TODO Phụ huynh sẽ không đợi các nhiệm vụ tách rời kết thúc trước khi quay trở lại
// TODO và tất cả các sự kiện có thể ảnh hưởng đến phụ huynh hoặc tác vụ tách rời là hoàn toàn độc lập (lỗi, hủy bỏ).


// TODO: join(task), join([...tasks])
// TODO Tạo mô tả Hiệu ứng hướng dẫn phần mềm trung gian đợi kết quả của một tác vụ fork trước đó.
// Chờ Task của fork kết thúc

// TODO: cancel(task)
// TODO Hủy bỏ Task được tạo bởi fork

// TODO Nếu dùng cancel(): hủy một nhiệm vụ mà nó đã được thực hiện (tự hủy)

// TODO: select(selector, ...args)
// TODO Gọi đến state của redux

function* _select() {
  while (true) {
    yield take('selectTest')
    const count = yield select(getCount, 'param1', 'param2')
    console.log('count: ' + count);
  }
}

const getCount = (state, param1, param2) => state.counter.value;

// TODO: cancelled()
// TODO Tạo một hiệu ứng hướng dẫn phần mềm trung gian trả về liệu trình tạo này đã bị hủy chưa.
// TODO Thông thường, bạn sử dụng Hiệu ứng này trong một khối cuối cùng để chạy mã hủy cụ thể


// TODO: delay(ms, [val])
// TODO Returns an effect descriptor to block execution for ms milliseconds and return val value.

// TODO: Ngoài ra còn có throttle debounce retry


// TODO: **********************************************************************

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
    _takeEvery(),
    _takeLatest(),
    _put(),
    _call(),
    _fork(),
    _select(),
  ])
}