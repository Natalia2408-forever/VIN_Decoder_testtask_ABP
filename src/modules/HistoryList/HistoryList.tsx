import React from 'react';
import { VinHistoryEntry } from '../../hooks/useVinHistory';
import styles from './HistoryList.module.scss';

interface HistoryListProps {
  history: VinHistoryEntry[];
  activeVin: string | null;
  onSelect: (entry: VinHistoryEntry) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, activeVin, onSelect }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-label="Recent requests">
      <h2 className={styles.title}>Recent requests</h2>
      <ul className={styles.list}>
        {history.map(entry => (
          <li key={entry.vin}>
            <button
              type="button"
              className={
                entry.vin === activeVin ? `${styles.item} ${styles.itemActive}` : styles.item
              }
              aria-pressed={entry.vin === activeVin}
              onClick={() => onSelect(entry)}
            >
              {entry.vin}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
