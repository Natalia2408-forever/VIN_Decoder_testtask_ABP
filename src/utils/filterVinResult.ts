import { DecodeVinResult } from '../types/vin';

const METADATA_VARIABLES = [
  'Error Code',
  'Error Text',
  'Vehicle Descriptor',
  'Additional Error Text',
  'Suggested VIN',
];

function hasValue(value: string | null | undefined): boolean {
  return Boolean(value && value.trim() !== '');
}

export function filterVinResult(results: DecodeVinResult[]): DecodeVinResult[] {
  return results.filter(
    item => hasValue(item.Value) && !METADATA_VARIABLES.includes(item.Variable),
  );
}

export function getVinError(results: DecodeVinResult[]): string | null {
  const filled = filterVinResult(results);

  if (filled.length > 0) {
    return null;
  }

  const errorText = results.find(item => item.Variable === 'Error Text')?.Value;

  return errorText || 'This VIN code was not found in the database.';
}
