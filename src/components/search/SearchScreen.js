import React from "react";
import { useLocation } from "react-router";
import { heroes } from "../../data/heroes";
import useForm from "../../hooks/useForm";
import HeroCard from "../heroes/HeroCard";

const SearchScreen = ({ history }) => {
  const location = useLocation();

  const heroesFiltered = heroes;

  const [formValues, handleInputChange] = useForm({ searchText: "" });

  const { searchText } = formValues;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchText);
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find your hero"
              className="form-control"
              value={searchText}
              onChange={handleInputChange}
              name="searchText"
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn btn-block btn-outline-primary m-1"
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;