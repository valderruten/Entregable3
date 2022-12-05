import axios from "axios";
import { useRef,useEffect, useState } from "react";
import "./App.css";
import ErrorFetch from "./components/ErrorFetch";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
 

function App() {
  const [location, setLocation] = useState();
  const [locationInput, setLocationInput] = useState();
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef()
  

  useEffect(() => {
    let URL;

    if (locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}`;
    } else {
      const randomIdLocation = Math.floor(Math.random() * 126) + 1;
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`;
    }

    axios
      .get(URL)
      .then((res) => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch((err) => {
        setHasError(true);
        console.log(err);
      });
  }, [locationInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocationInput(e.target.inputSearch.value);
    
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
 
  return (
    <div className="App">
      <h1>Rick and Morty</h1>
      <form onSubmit={handleSubmit}>
        <input id="inputSearch" type="text" ref={inputRef}/>
        <button>Search</button>
      </form>
      {hasError ? 
        <ErrorFetch />
      :
        <>
          <LocationInfo location={location} />
          <div className="residents-container">
            {location?.residents.map((url) => (
              <ResidentCard key={url} url={url} />
            ))}
          </div>
        </>
      }
    </div>
  )
}

export default App;
