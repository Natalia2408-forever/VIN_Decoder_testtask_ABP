import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useCallback,
  useState,
} from 'react';
import { validateVin } from '../../utils/validateVin';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import styles from './VinForm.module.scss';

interface VinFormProps {
  onSubmit: (vin: string) => void;
  disabled: boolean;
  apiError?: string | null;
  onClearApiError?: () => void;
}

export const VinForm: React.FC<VinFormProps> = ({
  onSubmit,
  disabled,
  apiError = null,
  onClearApiError,
}) => {
  const [vin, setVin] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayedError = localError ?? apiError;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setVin(event.target.value);

    if (localError) {
      setLocalError(null);
    }

    if (apiError) {
      onClearApiError?.();
    }
  }

  const handleEscape = useCallback(() => {
    setVin('');
    setLocalError(null);
    if (apiError) {
      onClearApiError?.();
    }

    inputRef.current?.focus();
  }, [apiError, onClearApiError]);

  useEscapeKey(handleEscape);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateVin(vin);

    setLocalError(validationError);

    if (validationError) {
      inputRef.current?.focus();

      return;
    }

    onSubmit(vin.trim().toUpperCase());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.label} htmlFor="vin-input">
        Please enter vehicle VIN code
      </label>
      <div className={styles.row}>
        <div className={styles.inputWrap}>
          <input
            id="vin-input"
            ref={inputRef}
            autoFocus
            className={
              displayedError
                ? `${styles.input} ${styles.inputInvalid}`
                : styles.input
            }
            type="text"
            value={vin}
            onChange={handleChange}
            placeholder="e.g., 1FTFW1CT5DFC10312"
            maxLength={17}
            disabled={disabled}
            aria-invalid={Boolean(displayedError)}
            aria-describedby={
              displayedError ? 'vin-count vin-error' : 'vin-count'
            }
          />
          <span id="vin-count" className={styles.counter}>
            {vin.length}/17
          </span>
        </div>

        <button className={styles.button} type="submit" disabled={disabled}>
          {disabled ? 'Please wait…' : 'Decode'}
        </button>
      </div>
      {displayedError && (
        <p id="vin-error" className={styles.error} role="alert">
          {displayedError}
        </p>
      )}
    </form>
  );
};
