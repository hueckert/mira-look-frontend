import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';

import styles from '../Dashboard/Dashboard.module.css'



const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);

 
  return (
    <main className={styles.container}>
      <header>
        <h1>Welcome, {user.username}</h1>
      </header>
      <article>
        <p>
          Please seatch for the movie you would like to post a review!
        </p>
      </article>
      <SearchBar></SearchBar>
    </main>
  );
};

export default Dashboard;