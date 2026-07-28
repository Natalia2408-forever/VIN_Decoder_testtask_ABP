import React, { useCallback, useState } from 'react';
import { decodeVin } from '../../api/vinApi';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { VinForm } from '../../modules/VinForm/VinForm';
import { ResultsList } from '../../modules/ResultsList/ResultsList';
import { HistoryList } from '../../modules/HistoryList/HistoryList';
import { Loader } from '../../modules/Loader/Loader';
import { ErrorMessage } from '../../modules/ErrorMessage/ErrorMessage';
import { useVinHistory, VinHistoryEntry } from '../../hooks/useVinHistory';
import { DecodeVinResult } from '../../types/vin';
import { filterVinResult, getVinError } from '../../utils/filterVinResult';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { history, addEntry } = useVinHistory();

  const [currentVin, setCurrentVin] = useState<string | null>(null);
  const [results, setResults] = useState<DecodeVinResult[]>([]);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = useCallback(
    async (vin: string) => {
      setLoading(true);
      setError(null);
      setApiMessage(null);

      try {
        const response = await decodeVin(vin);
        const vinError = getVinError(response.Results);

        const filled = vinError ? [] : filterVinResult(response.Results);

        setResults(filled);
        setCurrentVin(vin);

        setApiMessage(vinError);

        addEntry({
          vin,
          timestamp: Date.now(),
          results: filled,
          message: vinError || '',
        });
      } catch (err) {
        setError(getErrorMessage(err, 'Something went wrong'));
        setResults([]);
        setApiMessage(null);
      } finally {
        setLoading(false);
      }
    },
    [addEntry],
  );

  const handleHistorySelect = useCallback((entry: VinHistoryEntry) => {
    setResults(entry.results);
    setApiMessage(entry.message || null);
    setCurrentVin(entry.vin);
    setError(null);
  }, []);

  const handleEscape = useCallback(() => {
    if (!currentVin && !error) {
      return;
    }

    setCurrentVin(null);
    setResults([]);
    setApiMessage(null);
    setError(null);
  }, [currentVin, error]);

  useEscapeKey(handleEscape);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.headline}>Free VIN decoder for any car brand</p>

        <div className={styles.formBlock}>
          <VinForm
            onSubmit={handleDecode}
            disabled={loading}
            apiError={apiMessage}
            onClearApiError={() => setApiMessage(null)}
          />
        </div>

        <div className={styles.historyBlock}>
          <HistoryList history={history} activeVin={currentVin} onSelect={handleHistorySelect} />
        </div>

        <p className={styles.stats}>Our database holds more than a million VIN codes</p>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && currentVin && !apiMessage && (
        <section
          className={styles.results}
          aria-label="Decoding results"
          aria-live="polite"
          aria-keyshortcuts="Escape"
        >
          <h2 className={styles.resultsTitle}>Result for {currentVin}</h2>
          <ResultsList results={results} />
        </section>
      )}
    </div>
  );
};
