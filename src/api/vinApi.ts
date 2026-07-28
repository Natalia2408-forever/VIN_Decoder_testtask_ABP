import { DecodeVinResponse, VariablesListResponse } from '../types/vin';

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export async function decodeVin(vin: string): Promise<DecodeVinResponse> {
  const response = await fetch(`${BASE_URL}/decodevin/${encodeURIComponent(vin)}?format=json`);

  if (!response.ok) {
    throw new Error(`Server error (code ${response.status})`);
  }

  return response.json();
}

export async function getVariablesList(): Promise<VariablesListResponse> {
  const response = await fetch(`${BASE_URL}/getvehiclevariablelist?format=json`);

  if (!response.ok) {
    throw new Error(`Server error (code ${response.status})`);
  }

  return response.json();
}
