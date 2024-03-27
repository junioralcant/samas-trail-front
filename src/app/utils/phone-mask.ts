export function inputPhoneMask(value: string) {
  let valueFormatted = value;

  if (valueFormatted.length <= 15) {
    valueFormatted = valueFormatted.replace(/\D/g, '');
    valueFormatted = valueFormatted.replace(/(\d{2})(\d)/, '($1) $2');
    valueFormatted = valueFormatted.replace(/(\d{5})(\d)/, '$1-$2');
  }

  return valueFormatted;
}
