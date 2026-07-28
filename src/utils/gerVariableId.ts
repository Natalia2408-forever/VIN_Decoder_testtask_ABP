import { VehicleVariable } from '../types/vin';

export function getVariableId(variable: VehicleVariable): string {
  return String(variable.ID ?? variable.VariableId ?? variable.Id ?? '');
}
