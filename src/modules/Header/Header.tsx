import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import styles from './Header.module.scss';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/variables', label: 'Variables' },
];

export const Header: React.FC = () => (
  <header id="top" className={styles.header}>
    <div className={styles.container}>
      <NavLink to="/" className={styles.logo}>
        <img src={logo} alt="VIN Decoder" className={styles.logoImage} />
      </NavLink>
      <nav aria-label="Main navigation">
        <ul className={styles.nav}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);
