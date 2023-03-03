import React, {useState} from 'react'
import SearchBar from '../Components/Home/SearchBar.js'
import SearchResult from "../Components/Home/SearchCard.js";

const Home = () => {
  const [searchResult, setSearchResult] = useState("");

  function handleDataFromSearchBar(data) {
    setSearchResult(data);
  }
  return (
    <div>
    <SearchBar onDataFromSearchBar={handleDataFromSearchBar}/>
    <div style={{ width: '80%', margin: '0 auto' }}>
    <SearchResult result={searchResult} />
    </div>
    </div>
  );
}
export default Home;