import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { categories } from "../filterDB";
import { countries } from "../filterDB";

function Search() {
  const { setSearchTerm } = useGlobalContext(); // from context api
  const [text, setText] = useState("");

  //  search box event function
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  };

  return (
    <>
      <div className="searchbox">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search your meal..."
            value={text}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="filter-meals">
        <h3>Filter Meals </h3>
        <div className="filter">
          <div className="by-category">
            <h4>By Category :</h4>
            {categories.map((category) => {
              const { id, categoryName } = category;
              return (
                <button
                  key={id}
                  value={categoryName}
                  onClick={() => setSearchTerm(categoryName)}
                >
                  {categoryName}
                </button>
              );
            })}
          </div>

          <div className="by-country">
            <h4>By Country :</h4>
            {countries.map((country) => {
              const { id, countryName } = country;
              return (
                <button
                  key={id}
                  value={countryName}
                  onClick={() => setSearchTerm(countryName)}
                >
                  {countryName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
