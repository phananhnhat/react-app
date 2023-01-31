// https://jestjs.io/docs/mock-functions

import {forEach} from '../utils/forEach';

// Mock Functions

// Các hàm mô phỏng cho phép bạn kiểm tra các liên kết giữa các mã bằng cách xóa cài đặt thực tế của một hàm,
//   ghi lại các lệnh gọi hàm (và các tham số được truyền trong các lệnh gọi đó),
//   ghi lại các phiên bản của các hàm hàm tạo khi được khởi tạo bằng hàm mới và cho phép cấu hình thời gian thử nghiệm của các giá trị trả về.
// Có hai cách để mô phỏng hàm: Hoặc bằng cách tạo một hàm mô phỏng để sử dụng trong mã kiểm tra hoặc viết một mô phỏng thủ công để ghi đè lên phần phụ thuộc mô-đun.

// Using a mock function

// To test this function, we can use a mock function, and inspect the mock's state to ensure the callback is invoked as expected.
const mockCallback = jest.fn(x => 42 + x);
test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);

});

// .mock property

test('forEach mock function 1', () => {
  forEach([0, 1], mockCallback);

  // The function was called exactly once
  expect(mockCallback.mock.calls).toHaveLength(1);

// The first arg of the first call to the function was 'first arg'
  expect(mockCallback.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
  expect(mockCallback.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
  expect(mockCallback.mock.results[0].value).toBe('return value');

// The function was called with a certain `this` context: the `element` object.
  expect(mockCallback.mock.contexts[0]).toBe(element);

// This function was instantiated exactly twice
  expect(mockCallback.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
  expect(mockCallback.mock.instances[0].name).toBe('test');

// The first argument of the last call to the function was 'test'
  expect(mockCallback.mock.lastCall[0]).toBe('test');
});

// Mock Return Values

const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true

