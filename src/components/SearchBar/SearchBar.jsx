import React, { useState } from 'react';
const apiKey = import.meta.env.API_KEY;
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=9b18590f&s=${searchTerm}`);
      const data = await response.json();
      console.log(data)
      setResults(data.Search);
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      <ul style={{ listStyleType: 'none' }}>
        {results.map((result) => {
          console.log(result)
        return (
          <li key={result.id}> 
            <img src={result.Poster}/>
            <p> 
              {result.Title} 
            </p>
            <p> 
              Type: {result.Type}      
            </p>
            <p> 
              Year: {result.Year}  
            </p>
            <p> 
              imdbID: {result.imdbID}       
            </p>
            <Link to= "/watch-list/new" state={ result } >Add to list</Link>
          </li>)
        })}
      </ul>
    </div>
  );

}

export default SearchBar;