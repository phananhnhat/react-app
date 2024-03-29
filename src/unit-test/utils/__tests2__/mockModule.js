// https://jestjs.io/docs/mock-functions#mocking-modules

// users.js

// import axios from 'axios';
// class Users {
//   static all() {
//     return axios.get('/users.json').then(resp => resp.data);
//   }
// }
// export default Users;

// users.test.js
import axios from 'axios';
import Users from '../users';

jest.mock('axios');
test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
// Test
