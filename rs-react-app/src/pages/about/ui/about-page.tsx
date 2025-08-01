import { type ReactElement } from 'react';
import styles from './about.module.css';

export function AboutPage(): ReactElement {
  return (
    <div className={styles.about_page}>
      <p className={styles.title}>About</p>
      <div className={styles.aboutContent}>
        <p className={styles.text}>
          Hello. My name is Roma Bubnov. I graduated from the Saratov State
          Conservatory with a degree in music performance. My fascination with
          programming started around 2019. Like many people, I was curious about
          the world behind the software we use every day. My first programming
          language was Java, but i quickly found that JavaScript resonated with
          me in a way that Java hadn&apos;t initially. I think it was the
          dynamic nature of the language and its versatility. In the final
          project, my team and I decided to try our hand at React; it is on
          studying this JavaScript library that I would like to focus further
          development.
        </p>
        <div className={styles.rs}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logo}
            href="https://rs.school/courses/reactjs"
          ></a>
        </div>
      </div>
    </div>
  );
}
