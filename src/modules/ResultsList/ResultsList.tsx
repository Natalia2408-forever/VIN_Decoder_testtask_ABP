import React from 'react';
import { DecodeVinResult } from '../../types/vin';
import styles from './ResultsList.module.scss';

interface ResultsListProps {
  results: DecodeVinResult[];
}

export const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <p className={styles.empty}>No data is available for this VIN code.</p>
    );
  }

  return (
    <ul className={styles.list}>
      {results.map((item) => (
        <li className={styles.row} key={item.VariableId}>
          <span className={styles.term}>{item.Variable}</span>
          <span className={styles.value}>{item.Value}</span>
        </li>
      ))}
    </ul>
  );
};
