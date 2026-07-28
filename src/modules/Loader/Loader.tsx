import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loader} role="status" aria-live="polite">
    <ClipLoader size={22} color="#2f6fed" />
    <span>Loading...</span>
  </div>
);
