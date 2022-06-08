import React, { useState } from "react";
import { useQuery } from "react-query";

import useDebounce from "../utils/useDebounce";
import searchPokemons from "../utils/searchPokemons";

import SampleComponent from "../components/sample";
import PokemonsSearchResult from "../components/pokemonSearchResult";

export default function IndexPage() {
  const [searchValue, setSearchValue] = useState("");
  const debounedSearchValue = useDebounce(searchValue, 300);

  const { isLoading, isError, isSuccess, data } = useQuery(
    ["searchPokemons", debounedSearchValue],
    () => searchPokemons(debounedSearchValue),
    {
      enabled: debounedSearchValue.length > 0,
    }
  );

  const renderResult = () => {
    if (isLoading) {
      return <div className="search-message">Loading... </div>;
    }

    if (isError) {
      return <div className="search-message">Something went wrong</div>;
    }

    if (isSuccess) {
      return <PokemonsSearchResult pokemons={data} />;
    }

    return <></>;
  };

  return (
    <div className="home">
      <h1>Search Your Pokemon</h1>
      <SampleComponent title="Index Page" linkTo="/" />

      <input
        type="text"
        onChange={({ target: { value } }) => setSearchValue(value)}
        value={searchValue}
      />
      {renderResult()}
    </div>
  );
}
