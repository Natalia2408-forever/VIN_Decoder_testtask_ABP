import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { VehicleVariable } from '../../types/vin';
import { Loader } from '../../modules/Loader';
import { ErrorMessage } from '../../modules/ErrorMessage';
import { getVariableId } from '../../utils/getVariableId';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useVariablesList } from '../../hooks/useVariablesList';
import styles from './VariablePage.module.scss';

const rows: { label: string; get: (v: VehicleVariable) => string | number }[] = [
  { label: 'ID', get: getVariableId },
  { label: 'Data type', get: v => v.DataType || '—' },
  { label: 'Group', get: v => v.GroupName || '—' },
  { label: 'Description', get: v => v.Description || '—' },
];

export const VariablePage: React.FC = () => {
  const { variableId } = useParams<{ variableId: string }>();
  const navigate = useNavigate();

  const { variables, loading, error: listError } = useVariablesList();

  const variable = variables.find(item => getVariableId(item) === variableId) ?? null;
  const error = !loading && !listError && !variable ? 'No variable found with this ID' : listError;

  useEscapeKey(() => navigate('/variables'));

  return (
    <div className={styles.page}>
      <Link className={styles.back} to="/variables" aria-keyshortcuts="Escape">
        ← All variables
      </Link>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && variable && (
        <>
          <h2 className={styles.title}>{variable.Name}</h2>
          <ul className={styles.details}>
            {rows.map(row => (
              <li className={styles.row} key={row.label}>
                <span className={styles.term}>{row.label}</span>
                <span className={styles.value}>{row.get(variable)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
