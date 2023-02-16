//@ts-nocheck
import React from 'react';
import { render,  fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

const mockStore = configureStore([]);

describe('App', () => {
  it('changes the card layout when layout buttons are clicked', () => {
    const store = mockStore({
      people: {
        activePage: 1,
        data: [
          { name: 'Luke Skywalker', height: '172', mass: '77' },
          { name: 'C-3PO', height: '167', mass: '75' },
          { name: 'R2-D2', height: '96', mass: '32' },
        ],
        loading: false,
        error: null,
      },
    });

    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getAllByRole('listitem')).toHaveLength(4);

    fireEvent.click(getByText('Grid View'));
    expect(getAllByRole('listitem')).toHaveLength(0);
    expect(getAllByRole('list')).toHaveLength(0);
    expect(getAllByRole('grid')).toHaveLength(4);

    fireEvent.click(getByText('List View'));
    expect(getAllByRole('gridcell')).toHaveLength(0);
    expect(getAllByRole('grid')).toHaveLength(0);
    expect(getAllByRole('listitem')).toHaveLength(4);
  });
});
