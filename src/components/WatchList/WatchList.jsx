import { Link } from 'react-router-dom';
import styles from './WatchList.module.css'

const WatchList = (props) => {
  return(
    <main className={styles.container}>
      {props.watchList.map((movie) => (
        <li className={styles.smallContainer}>
          <Link key={movie._id} to={`/watch-list/${movie._id}`}>
            <h2>{movie.Title} 👉</h2>
          </Link>
            <p> <h4> Review:</h4> {movie.Review}</p>
            <p className={styles.bottomFont}> Review created at: {new Date(movie.createdAt).toLocaleDateString()}</p> 
        </li>
      ))}
    </main>
  )
};
export default WatchList;