import React, { useState } from "react";
//import { Link } from "react-router-dom";
//import axios from "axios";
import Button from "@mui/material/Button";

import useFetch from './useFetch'
import "./App.css";

const ITEMS_PER_PAGE = 4;

const App = () => {
  const [activePage, setActivePage] = useState(1);
  const [cardLayout, setCardLayout] = useState("list");
  

  const { data, loading, error } = useFetch(`https://swapi.dev/api/people/?page=${activePage}`)

 

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleLayoutChange = (layout) => {
    setCardLayout(layout);
  };

  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < ITEMS_PER_PAGE; i++) {
      const index = (activePage - 1) * ITEMS_PER_PAGE + i;
      if (index >= data.length) {
        break;
      }
      const item = data[index];
      if (cardLayout === "grid") {
        cards.push(
          <div key={item.name} className={`card ${cardLayout}`}>
            <div className="card-body">
              <h3>{item.name}</h3>
              <p>Height: {item.height}</p>
              <p>Mass: {item.mass}</p>
            </div>
          </div>
        );
      } else if (cardLayout === "list") {
        cards.push(
          <li key={item.name} className={`card ${cardLayout}`}>
            <div className="card-body">
              <h3>{item.name}</h3>
              <p>Height: {item.height}</p>
              <p>Mass: {item.mass}</p>
            </div>
          </li>
        );
      }
    }
    return cardLayout === "grid" ? (
      <div className={`card-container `}>{cards}</div>
    ) : (
      <ul className={`card list`}>{cards}</ul>
    );
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        {activePage > 1 && (
          <Button variant="contained" onClick={() => handlePageClick(activePage - 1)}>
            Prev
          </Button>
        )}
        <Button
          variant="contained"
          disabled
          style={{ backgroundColor: "blue", color: "#fff" }}
        >
          {activePage}
        </Button>
        <Button variant="contained" onClick={() => handlePageClick(activePage + 1)}>
          Next
        </Button>
      </div>
    );
  };

  return (
    <div>
      <div className="button-container">
        <button
          className={cardLayout === "grid" ? "active" : ""}
          onClick={() => handleLayoutChange("grid")}
        >
          Grid View
        </button>
        <button
          className={cardLayout === "list" ? "active" : ""}
          onClick={() => handleLayoutChange("list")}
        >
          List View
        </button>
      </div>
      {loading && <h1 className="loading__state">Loading...</h1>}
      {error && !loading && <h1 className="loading__state">Error loading from API</h1>}
      {!loading && !error && renderCards()}
      {renderPagination()}
    </div>
  );
};

export default App;
