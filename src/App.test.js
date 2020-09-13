import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// import store from './app/store';
import { storeFile } from './features/redux';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={storeFile()}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
