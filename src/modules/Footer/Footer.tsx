import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import styles from './Footer.module.scss';

const links = [
  {
    name: 'About VIN codes',
    url: 'https://en.wikipedia.org/wiki/Vehicle_identification_number',
  },
  { name: 'GITHUB', url: 'https://github.com/Natalia2408-forever' },
];

function scrollToTop() {
  document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
}

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <NavLink to="/" className={styles.logo}>
        <img src={logo} alt="VIN Decoder" className={styles.logoImage} />
      </NavLink>
      <ul className={styles.list}>
        {links.map(({ name, url }) => (
          <li key={name}>
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {name}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.toTop}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        ↑
      </button>
    </div>
  </footer>
);
