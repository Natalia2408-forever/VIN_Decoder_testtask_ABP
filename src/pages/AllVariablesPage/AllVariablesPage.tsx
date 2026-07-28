import React from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../modules/Loader/Loader';
import { ErrorMessage } from '../../modules/ErrorMessage/ErrorMessage';
import { getVariableId } from '../../utils/getVariableId';
import { useVariablesList } from '../../hooks/useVariablesList';
import styles from './AllVariablesPage.module.scss';

export const AllVariablesPage: React.FC = () => {
  const { variables, loading, error } = useVariablesList();

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>All VIN-decoding variables</h2>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visually-hidden">List of all decodable VIN variables</caption>
            <thead>
              <tr>
                <th className={styles.colId} scope="col">
                  ID
                </th>
                <th className={styles.colName} scope="col">
                  Name
                </th>
                <th className={styles.colType} scope="col">
                  Data Type
                </th>
                <th className={styles.colGroup} scope="col">
                  Group Name
                </th>
              </tr>
            </thead>
            <tbody>
              {variables.map(item => {
                const id = getVariableId(item);

                return (
                  <tr key={id}>
                    <td className={styles.colId}>{id}</td>
                    <td className={styles.colName}>
                      <Link className={styles.link} to={`/variables/${id}`}>
                        {item.Name}
                      </Link>
                    </td>
                    <td className={styles.colType}>{item.DataType || '—'}</td>
                    <td className={styles.colGroup}>{item.GroupName || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
