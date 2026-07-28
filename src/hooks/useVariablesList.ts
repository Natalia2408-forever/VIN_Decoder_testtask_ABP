import { useEffect, useState } from 'react';
import { getVariablesList } from '../api/vinApi';
import { getErrorMessage } from '../utils/getErrorMessage';
import { VehicleVariable } from '../types/vin';

export function useVariablesList() {
  const [variables, setVariables] = useState<VehicleVariable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    getVariablesList()
      .then(response => {
        if (!ignore) {
          setVariables(response.Results);
        }
      })
      .catch(err => {
        if (!ignore) {
          setError(
            getErrorMessage(err, 'Could not load the list of variables'),
          );
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { variables, loading, error };
}
