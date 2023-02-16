//@ts-nocheck
import React from "react";
import { render,  fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";
import { setActivePage } from "../starWarsSlice";

const mockStore = configureStore([]);

describe("App", () => {
  it("dispatches the setActivePage action when pagination buttons are clicked", () => {
    const store = mockStore({
      people: {
        activePage: 1,
        data: [
          { name: "Luke Skywalker", height: "172", mass: "77" },
          { name: "C-3PO", height: "167", mass: "75" },
          { name: "R2-D2", height: "96", mass: "32" },
        ],
        loading: false,
        error: null,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(getByText("Next"));
    expect(store.getActions()).toEqual([setActivePage(2)]);

    fireEvent.click(getByText("Prev"));
    expect(store.getActions()).toEqual([setActivePage(2), setActivePage(1)]);
  });
});
