export function inputCPFMask(value: string) {
  let valueFormatted = value;

  if (valueFormatted.length <= 14) {
    valueFormatted = valueFormatted.replace(/\D/g, '');
    valueFormatted = valueFormatted.replace(/(\d{3})(\d)/, '$1.$2');
    valueFormatted = valueFormatted.replace(/(\d{3})(\d)/, '$1.$2');
    valueFormatted = valueFormatted.replace(
      /(\d{3})(\d{2})$/,
      '$1-$2'
    );
  }

  return valueFormatted;
}
