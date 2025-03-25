//import libraries
import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate  } from 'react-router-dom';

// import components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import WatchList from './components/WatchList/WatchList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieForm from './components/MovieForm/MovieForm';


//import severvices
import * as authService from '../src/services/authService'; 
import * as watchListService from '../src/services/watchListService'
import SearchBar from './components/SearchBar/SearchBar';


export const AuthedUserContext = createContext(null);

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [watchList, setWatchList] = useState([])
  

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchAllWatchLists = async() => {
      const watchListsData = await watchListService.index();
      console.log(watchListsData)
      setWatchList(watchListsData)
    };
    if (user) fetchAllWatchLists();
  }, [user])

  const handleAddMovie = async (movieFormData) => {
    console.log('movieFormData', movieFormData);
    const newMovie = await watchListService.create(movieFormData);
    setWatchList([newMovie, ...watchList])
    navigate('/watch-list');
  };

  const handleDeleteMovie = async (movieId) => {
    const deletedMovie = await watchListService.deleteMovie(movieId);
    setWatchList(watchList.filter((movie) => movie._id !== deletedMovie._id));
    navigate('/watch-list');
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/watch-list" element={<WatchList watchList={watchList}/>}> </Route> 
              <Route path="/watch-list/:movieId" element={<MovieDetails handleDeleteMovie={handleDeleteMovie}/>} />
              <Route path="/watch-list/new" element={<MovieForm handleAddMovie={handleAddMovie}/>} />
            </>
          ) : (
              <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;