import styles from './ErrorMessage.module.scss';

export function ErrorMessage({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className={styles.error} role="alert">
      {message}
    </p>
  );
}
