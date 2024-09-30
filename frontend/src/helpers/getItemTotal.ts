import round from 'lodash/round';

export default function getItemTotal({
  quantity,
  value,
  rentalDays,
}: {
  quantity: number;
  value: number;
  rentalDays: number;
}) {
  return round(quantity * value * rentalDays, 2);
}
