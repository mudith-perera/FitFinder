import React, { useEffect, useState } from "react";
import SearchBar from "../Components/Home/SearchBar.js";
import SearchResult from "../Components/Home/SearchCard.js";
import Counter from "../Components/Home/Counter.js";
import Aos from "aos";
import "aos/dist/aos.css";

import Fitfinder from "./../Images/fitfinderani.gif";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookie] = useCookies([""]);
  const [LoggedUser] = useState(cookie.LoggedUser ? cookie.LoggedUser[1] :false);
  const [showLogo, setShowLogo] = useState(true);
  const [currentPath] = useState(window.location.pathname);
  const [dataG, setDataG] = useState(null);
  const [dataU, setDataU] = useState(null);
  useEffect(() => {
    Aos.init({ duration: 1000 });
    const fetchData = async () => {
      const responseG = await fetch("api/gyms/");
      const responseU = await fetch("api/users/");
      setDataG(await responseG.json());
      setDataU(await responseU.json());
  };
  fetchData();
    if (currentPath === "/") {
      const timeout = setTimeout(() => {
        setShowLogo(false);
      }, 4500);
      return () => clearTimeout(timeout);
    }else{
      setShowLogo(false);
    }
  }, [showLogo, currentPath,LoggedUser]);

  const [searchResult, setSearchResult] = useState("");

  const styles = {
    searchResult: {
      width: "75%",
      margin: "0 auto"
    },
    searchResultCard: {
      backgroundColor: "#212529",
      borderRadius: "1rem",
      padding: "3rem",
      paddingTop: "2rem",
      marginBottom: "2rem"
    },
    searchResultTitle: {
      color: "white",
      marginBottom: "2rem"
    }
  };

  function handleDataFromSearchBar(data) {
    setSearchResult(data);
  }

  if (showLogo && !LoggedUser) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
        <img src={Fitfinder} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
    );
  }
  return (
    <div>
      <Counter dataG={dataG} dataU={dataU}/>
      <SearchBar onDataFromSearchBar={handleDataFromSearchBar} />
      {searchResult ? (
        <div data-aos="fade-right" style={styles.searchResult}>
          <div style={styles.searchResultCard}>
            <h5 style={styles.searchResultTitle}>
              {searchResult?.length || "0"} Results found
            </h5>
            <SearchResult result={searchResult} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
