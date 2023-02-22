import React from 'react'
import SearchBar from '../Components/Home/SearchBar.js'
import SearchResult from "../Components/Home/SearchCard.js";

const Home = () => {
  return (
    <div>
    <SearchBar/>
    <div style={{ width: '80%', margin: '0 auto' }}>
    <SearchResult />
    </div>
    </div>
  );
}
export default Home;