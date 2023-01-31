import { render, screen } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
import configureStore from './configureStore'

test('renders learn react link', () => {
  // const initialState = { output: 10 };
  // const mockStore = configureStore();
  // let store = mockStore(initialState);
  const store = configureStore({
    counter: {},
    todos: [],
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
