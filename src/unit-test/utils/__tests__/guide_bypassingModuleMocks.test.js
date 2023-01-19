// https://jestjs.io/docs/bypassing-module-mocks

// jest.mock('node-fetch');
//
// import fetch, {Response} from 'node-fetch';
// import {createUser} from './createUser';
//
// test('createUser calls fetch with the right args and returns the user id', async () => {
//   fetch.mockReturnValue(Promise.resolve(new Response('4')));
//
//   const userId = await createUser();
//
//   expect(fetch).toHaveBeenCalledTimes(1);
//   expect(fetch).toHaveBeenCalledWith('https://website.com/users', {
//     method: 'POST',
//   });
//   expect(userId).toBe('4');
// });

// TODO by NhatPA: ếu bạn chạy thử nghiệm đó, bạn sẽ thấy rằng createUserchức năng này không thành công, gây ra lỗi: TypeError: response.text is not a function.
//  Điều này là do Responselớp mà bạn nhập vào node-fetchđã bị giả lập (do lệnh jest.mockgọi ở đầu tệp kiểm tra) nên nó không còn hoạt động như bình thường nữa.
//  Để giải quyết các vấn đề như thế này, Jest cung cấp trình jest.requireActualtrợ giúp. Để kiểm tra ở trên hoạt động, hãy thực hiện thay đổi sau đối với mục nhập trong tệp kiểm tra:

// BEFORE
// jest.mock('node-fetch');
// import fetch, {Response} from 'node-fetch';

// AFTER
// jest.mock('node-fetch');
// import fetch from 'node-fetch';
// const {Response} = jest.requireActual('node-fetch');
