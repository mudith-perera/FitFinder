import React, { useEffect,useState } from "react";
import SearchBar from "../Components/Home/SearchBar.js";
import SearchResult from "../Components/Home/SearchCard.js";
import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });
  const [searchResult, setSearchResult] = useState("");

  function handleDataFromSearchBar(data) {
    setSearchResult(data);
  }
  return (
    <div>
      <SearchBar onDataFromSearchBar={handleDataFromSearchBar} />
      {searchResult?(
        <div data-aos="fade-right" style={{ width: "75%", margin: "0 auto", backgroundColor: "#212529", borderRadius: "1rem", padding: "3rem",paddingTop: "4rem" }}>
        <SearchResult result={searchResult} />
      </div>
      ):(<></>)}
      
    </div>
  );
};
export default Home;
