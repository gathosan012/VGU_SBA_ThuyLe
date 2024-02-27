export const objectIsNullOrEmpty = (object: any): boolean => {
  return Object.keys(object).length === 0;
};

export const toStringMonthYear = (input: Date): string => {
  let value = new Date(input);
  const year = value.getFullYear();
  const month = toStringLeadingZeros(value.getMonth() + 1, 2);
  return `${month}/${year}`;
};

export const toStringDate = (input: Date): string => {
  let value = new Date(input);
  const year = value.getFullYear();
  const month = toStringLeadingZeros(value.getMonth() + 1, 2);
  const date = toStringLeadingZeros(value.getDate(), 2);
  return `${year}/${month}/${date}`;
};

export const toStringTime = (input: Date): string => {
  let value = new Date(input);
  const hours = toStringLeadingZeros(value.getHours(), 2);
  const minutes = toStringLeadingZeros(value.getMinutes(), 2);
  const seconds = toStringLeadingZeros(value.getSeconds(), 2);
  return `${hours}:${minutes}:${seconds}`;
};

function toStringLeadingZeros(input: number, targetLength: number): string {
  return String(input).padStart(targetLength, "0");
}
