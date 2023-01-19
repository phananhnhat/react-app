// https://jestjs.io/docs/snapshot-testing

// import renderer from 'react-test-renderer';
// import Link from '../../Link';
//
// it('renders correctly', () => {
//     const tree = renderer
//       .create(<Link page="http://www.facebook.com">Facebook</Link>)
//       .toJSON();
//     expect(tree).toMatchSnapshot();
// });

// ------------------------------------------------------------
import * as user from '../user';

jest.mock('../request');

// The assertion for a promise must be returned.
it('works with promises', () => {
    expect.assertions(1);
    return user.getUserName(4).then(data => expect(data).toBe('Mark'));
});

it('works with resolves', () => {
    expect.assertions(1);
    return expect(user.getUserName(5)).resolves.toBe('Paul');
});

// async/await can be used.
it('works with async/await', async () => {
    expect.assertions(1);
    const data = await user.getUserName(4);
    expect(data).toBe('Mark');
});

// async/await can also be used with `.resolves`.
it('works with async/await and resolves', async () => {
    expect.assertions(1);
    await expect(user.getUserName(5)).resolves.toBe('Paul');
});

// Error handling -------------------------------------------------------------

// Testing for async errors using Promise.catch.
it('tests error with promises', () => {
    expect.assertions(1);
    return user.getUserName(2).catch(e =>
      expect(e).toEqual({
          error: 'User with 2 not found.',
      }),
    );
});

// Or using async/await.
it('tests error with async/await', async () => {
    expect.assertions(1);
    try {
        await user.getUserName(1);
    } catch (e) {
        expect(e).toEqual({
            error: 'User with 1 not found.',
        });
    }
});

// .rejects -------------------------------------------------------------------

it('tests error with rejects', () => {
    expect.assertions(1);
    return expect(user.getUserName(3)).rejects.toEqual({
        error: 'User with 3 not found.',
    });
});

// Or using async/await with `.rejects`.
it('tests error with async/await and rejects', async () => {
    expect.assertions(1);
    await expect(user.getUserName(3)).rejects.toEqual({
        error: 'User with 3 not found.',
    });
});

