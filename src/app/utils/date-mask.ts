export function inputDateMask(value: string) {
  let valueFormatted = value;

  valueFormatted = valueFormatted.replace(/\D/g, '');

  if (valueFormatted.length > 2) {
    valueFormatted = valueFormatted.replace(/^(\d{2})(\d)/, '$1/$2');
    if (valueFormatted.length > 5) {
      valueFormatted = valueFormatted.replace(
        /^(\d{2})\/(\d{2})(\d)/,
        '$1/$2/$3'
      );
    }
  }

  return valueFormatted;
}
