// import { initializeCityDatabase, clearCityDatabase, isCity, initializeFoodDatabase } from '../utils/isCity'
//
// // Repeating Setup
// beforeEach(() => {
//   return initializeCityDatabase();
// });
//
// afterEach(() => {
//   return clearCityDatabase();
// });
//
// test('city database has Vienna', () => {
//   expect(isCity('Vienna')).toBeTruthy();
// });
//
// test('city database has San Juan', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });
//
// // One-Time Setup
// // Trong một số trường hợp, bạn chỉ cần thiết lập một lần ở đầu tệp. Điều này có thể đặc biệt khó chịu khi thiết lập không đồng bộ, vì vậy bạn không thể thực hiện nội tuyến.
// // Jest cung cấp beforeAllvà afterAllhook để xử lý tình huống này.
// // Ví dụ: nếu cả hai initializeCityDatabase() và clearCityDatabase() trả về lời hứa và cơ sở dữ liệu thành phố có thể được sử dụng lại giữa các lần kiểm tra,
// // chúng tôi có thể thay đổi mã kiểm tra của mình thành:
// beforeAll(() => {
//   return initializeCityDatabase();
// });
//
// afterAll(() => {
//   return clearCityDatabase();
// });
//
// test('city database has Vienna 1', () => {
//   expect(isCity('Vienna')).toBeTruthy();
// });
//
// test('city database has San Juan 1', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });
//
//
// // Scoping
// // Cấp cao nhất before*và after*móc áp dụng cho mọi bài kiểm tra trong một tệp. Các móc được khai báo bên trong một describekhối chỉ áp dụng cho các thử nghiệm trong describekhối đó.
// // Applies to all tests in this file
// beforeEach(() => {
//   return initializeCityDatabase();
// });
// test('city database has Vienna 3', () => {
//   expect(isCity('Vienna')).toBeTruthy();
// });
//
// test('city database has San Juan 3', () => {
//   expect(isCity('San Juan')).toBeTruthy();
// });
//
// describe('matching cities to foods', () => {
//   // Applies only to tests in this describe block
//   beforeEach(() => {
//     return initializeFoodDatabase();
//   });
//
//   // test('Vienna <3 veal', () => {
//   //   expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
//   // });
//   //
//   // test('San Juan <3 plantains', () => {
//   //   expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
//   // });
// });
//
// // https://jestjs.io/docs/setup-teardown#scoping
//
// // Order of Execution
