import styles from './Landing.module.css';
import logo from '../../assets/logo.jpg'

const Landing = () => {
  return (
    <main className={styles.container}>
      <section className={styles.splash}>
          <img src={logo} alt="movie logo" />
      </section>

      <section className={styles.about}>
        <header>
          <h1>Hello, welcom to To-Watch!</h1>
        </header>
        <article>
          <p>
            If you haven't sign up for a new account, please sign up first to use all the features!
          </p>
        </article>
      </section>
    </main>
  );
};

export default Landing;