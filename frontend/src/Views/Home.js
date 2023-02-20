import React from 'react'
import SearchBar from '../Components/Home/SearchBar.js'
import SearchResult from "../Components/Home/SearchCard.js";

const Home = () => {
  return (
    <div>
    <SearchBar/>
    <SearchResult />
    </div>
  );
}
export default Home;