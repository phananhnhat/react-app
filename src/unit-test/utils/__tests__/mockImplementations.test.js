// https://jestjs.io/docs/mock-functions#mock-implementations

// vẫn có những trường hợp hữu ích khi vượt ra ngoài khả năng chỉ định giá trị trả về và thay thế hoàn toàn việc triển khai hàm giả.
// Điều này có thể được thực hiện với phương thức jest.fn hoặc mockImplementationOnce trên các hàm giả.

// const myMockFn = jest.fn(cb => cb(null, true));
// myMockFn((err, val) => console.log(val));

// .................
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
// Thực hiện viết lại hàm foo sau khi sử dụng mock module
foo.mockImplementation(() => 42);
foo(); // > 42

// Khi bạn cần tạo lại một hành vi phức tạp của một hàm giả sao cho nhiều lệnh gọi hàm tạo ra các kết quả khác nhau, hãy sử dụng phương thức mockImplementationOnce:
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true
myMockFn((err, val) => console.log(val));
// > false

// TODO by NhatPA: mockImplementationOnce và mockReturnValueOnce
//  mockImplementationOnce đặt 1 lần chạy tiếp theo sẽ là chạy funtion nào
//  mockReturnValueOnce đặt 1 lần chạy tiếp sẽ trả về giá trị nào

// ---------------------------------------------------------------------------------
const myMockFn1 = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn1(), myMockFn1(), myMockFn1(), myMockFn1());
// > 'first call', 'second call', 'default', 'default'
// ---------------------------------------------------------------------------------
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
// -----------------------------------------------------------------------------------
const myMockFn2 = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');

// -------------------------------------------------------------
// https://jestjs.io/docs/mock-functions#custom-matchers
