import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as watchListService from '../../services/watchListService'

import styles from '../MovieForm/MovieForm.module.css'

const MovieForm = (props) => {
  // console.log(props)
  const location = useLocation()
  const fromResult  = location.state
  const [review, setReview] = useState("")
  const [formData, setFormData] = useState({
    Title: `${fromResult.Title}`,
    Year: `${fromResult.Year}`,
    Type: `${fromResult.Type}`,
    Review: `${review}`,
  });

const { movieId } = useParams();

useEffect(() => {
  const fetchMovie = async () => {
    const movieData = await watchListService.show(movieId);
    setFormData(movieData);
  };
  fetchMovie();
}, [movieId]);

const handleReviewChange = (evt) => {
  setReview(evt.target.value);
  setFormData(
    {
      Title: `${fromResult.Title}`,
      Year: `${fromResult.Year}`,
      Type: `${fromResult.Type}`,
      Review: `${review}`,
    }
  )
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  props.handleAddMovie(formData);
  console.log('formData', formData);
  // We'll update this function shortly...
}



  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.movieFormContainer} >
        <label htmlFor="Title"> Name </label>
        <input
          type="text"
          id="Title"
          name="Title"
          value={formData.Title}    
          // onChange={handleChange}
          readOnly        
        />
        <label htmlFor="Type">Type </label>
        <input
          type="text" 
          id="Type"
          name="Type"
          value={formData.Type} 
          // onChange={handleChange} 
          readOnly   
        />
        <label htmlFor="Year"> Year </label>
        <input
          type="text"
          id="Year"
          name="Year"
          value={formData.Year}  
          // onChange={handleChange}
          readOnly 
        />
        <hr></hr>
        <label htmlFor="Review"> Review </label>
        <textarea
          type="text"
          id="Review"
          name="Review"
          value={formData.Comment}  
          onChange={handleReviewChange}
          required   
        />
        <button type="submit" className={styles.button}>Add To Watch List</button>
      </form>
    </div>
)}

export default MovieForm;