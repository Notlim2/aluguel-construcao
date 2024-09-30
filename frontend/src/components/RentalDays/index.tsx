import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type optionType = { id: number; label: string };
const OPTIONS = [
  { id: 1, label: '1 Dia' },
  { id: 7, label: '1 Semana' },
  { id: 15, label: '1 Quinzena' },
  { id: 30, label: '1 Mês' },
];

interface RentalDaysProps {
  label: string;
  value: number;
  setValue: (newValue: number) => void;
  disabled?: boolean;
}

export default function RentalDaysSelector({
  label,
  setValue,
  value,
  disabled,
}: RentalDaysProps) {
  return (
    <Autocomplete
      disableClearable
      disabled={disabled}
      aria-labelledby="rental-days-label"
      renderInput={(props) => <TextField {...props} label={label} />}
      value={OPTIONS.find((opt) => opt.id === value) as optionType}
      onChange={(_e, newValue) => newValue && setValue(newValue.id)}
      options={OPTIONS}
    />
  );
}
