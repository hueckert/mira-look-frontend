import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

import styles from './NavBar.module.css';


const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav className={styles.container}>
          <ul>  
            <li><Link to='/'>🏠 HOME</Link></li>  
            <li><Link to="/watch-list">🎬 Watch List</Link></li>
            {/* <li><Link to="/watch-list/new">New Movie To Watch</Link></li> */}
            <li><Link to="" onClick={handleSignout}>👋 Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav className={styles.container}>
          <ul>
            <li>
              <Link to="/signin"> ✍️ Sign In</Link>
            </li>
            <li>
              <Link to="/signup">🙋 Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;