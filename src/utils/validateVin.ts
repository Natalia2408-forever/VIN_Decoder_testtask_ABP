const vinPattern = /^[A-HJ-NPR-Z0-9]+$/i;

export function validateVin(rawVin: string): string | null {
  const vin = rawVin.trim();

  if (vin.length === 0) {
    return 'Please enter a VIN code';
  }

  if (vin.length !== 17) {
    return 'VIN code must contain 17 characters';
  }

  if (!vinPattern.test(vin)) {
    return 'VIN code contains invalid characters (letters I, O, Q are not allowed)';
  }

  return null;
}
