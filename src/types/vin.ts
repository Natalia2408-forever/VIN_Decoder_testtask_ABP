export interface DecodeVinResult {
  Value: string | null;
  Variable: string;
  VariableId: number;
}

export interface DecodeVinResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: DecodeVinResult[];
}

export interface VehicleVariable {
  Id?: number;
  ID?: number;
  VariableId?: number;
  Name: string;
  DataType: string;
  Description: string;
  GroupName: string;
}

export interface VariablesListResponse {
  Count: number;
  Message: string;
  Results: VehicleVariable[];
}
