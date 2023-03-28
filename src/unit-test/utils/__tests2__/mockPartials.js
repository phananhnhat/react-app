// https://jestjs.io/docs/mock-functions#mocking-partials

//test.js
import defaultExport, {bar, foo} from '../foo-bar-baz';

// Các tập hợp con của một mô-đun có thể được mô phỏng và phần còn lại của mô-đun có thể tiếp tục triển khai thực tế của chúng:
jest.mock('../foo-bar-baz', () => {
  const originalModule = jest.requireActual('../foo-bar-baz');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});
