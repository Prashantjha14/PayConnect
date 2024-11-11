/**
 * Validates if the provided UPI ID is in the correct format.
 * @param upiId - The UPI ID to validate.
 * @returns boolean - Returns true if the UPI ID is valid, false otherwise.
 */
export const isValidUpiId = (upiId: string): boolean => {
  if (!upiId) {
    return false;
  }

  const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;

  return regex.test(upiId);
};
