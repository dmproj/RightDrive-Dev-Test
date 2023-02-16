import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const ITEMS_PER_PAGE = 4;

const App = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [cardLayout, setCardLayout] = useState("list");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${activePage}`
      );
      setData(response.data.results);
    };

    fetchData();
  }, [activePage]);

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
          <Link
            to={`/?page=${activePage - 1}`}
            onClick={() => handlePageClick(activePage - 1)}
          >
            Prev
          </Link>
        )}
        <span>{activePage}</span>
        <Link
          to={`/?page=${activePage + 1}`}
          onClick={() => handlePageClick(activePage + 1)}
        >
          Next
        </Link>
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
      {renderCards()}
      {renderPagination()}
    </div>
  );
};



export default App;
