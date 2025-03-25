import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as watchListService from '../../services/watchListService'
import CommentForm from '../CommentForm/CommentForm';
import WatchList from '../WatchList/WatchList';
import { AuthedUserContext } from '../../App';

import styles from './MovieDetails.module.css'


const MovieDetails = (props) => {
    const { movieId } = useParams();
    const user = useContext(AuthedUserContext);

    const [movie, setMovie] = useState(null);
    
    useEffect(() => {
      const fetchMovie = async () => {
        const movieData = await watchListService.show(movieId);
        console.log(movieData);
        setMovie(movieData)
      };
      fetchMovie();
    }, [movieId]);

   
    const handleAddComment = async (commentFormData) => {
      const newComment = await watchListService.createComment(movieId, commentFormData);
      setMovie({ ...movie, Comments: [...movie.Comments, newComment] });
    };


    if (!movie) return <main>Loading...</main>;
    return (
      <main className={styles.container}> 
        <h2>{movie.Title}</h2> 
        <ul>
              <li> 
                Type: {movie.Type}      
              </li>
              <li> 
                Year: {movie.Year}  
              </li>
              {/* <li>
                Country: {movie.Country} 
              </li>
              <li>
                Language: {movie.Language} 
              </li>
              <li>
                Director: {movie.Director}
              </li>
              <li>
                Actors: {movie.Actors}
              </li>  
              <li>
                imdbID: {movie.imdbID}  
              </li>
              <li>
                Plot: {movie.Plot}
              </li> */}
            </ul>
            <h4>Review: </h4>
            <p>{movie.Review}</p>
            {movie.author === user._id && (
              <>
                <button onClick={() => props.handleDeleteMovie(movieId)}>Delete</button> 
              </>
            )}
            <br></br>
            <br></br>
    
            <h2>Comments</h2>
            <h4>Comments on the review:</h4>
            <ul style={{ listStyleType: 'none' }}>
              {movie.Comments.map((eachComment) => {
                return (
                  <li key={eachComment.id} style={{ listStyleType: 'number' }}>  
                    {eachComment.text} 
                    <p>
                      {eachComment.author.username} posted on
                      {new Date(eachComment.createdAt).toLocaleDateString()}
                    </p>          
                  </li>
                )
              })}
            </ul>

        <CommentForm handleAddComment={handleAddComment}/>
      </main>
    )
}

export default MovieDetails; 