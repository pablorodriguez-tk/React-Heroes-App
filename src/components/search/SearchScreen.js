import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import useForm from "../../hooks/useForm";
import HeroCard from "../heroes/HeroCard";
import getHeroesByName from "../../selectors/getHeroesByName";

const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({ searchText: q });

  const { searchText } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

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
          <hr />
          {q === "" && <div className="alert alert-info">Search a hero</div>}
          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">
              There is no a hero with {q}
            </div>
          )}
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
