import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useCallback } from 'react';

interface CountInputProps {
  value: number;
  setValue: (newValue: number) => void;
  label: string;
  disabled?: boolean;
}

export default function CountInput({
  setValue,
  value,
  label,
  disabled,
}: CountInputProps) {
  const theme = useTheme();
  const add = useCallback(() => {
    const newValue = value + 1;
    setValue(newValue);
  }, [setValue, value]);
  const sub = useCallback(() => {
    const newValue = value - 1;
    if (newValue <= 0) {
      return;
    }
    setValue(newValue);
  }, [setValue, value]);
  return (
    <TextField
      fullWidth
      disabled={disabled}
      label={label}
      value={value}
      onChange={(e) => setValue(+e.target.value.replaceAll(/\D/g, ''))}
      InputProps={{
        inputProps: { style: { userSelect: 'none' } },
        sx: { pr: 0 },
        endAdornment: (
          <InputAdornment position="end">
            <Stack rowGap={0.25}>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  p: 0,
                  minWidth: theme.spacing(6),
                  width: theme.spacing(6),
                }}
                onClick={add}
              >
                <AddIcon />
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  p: 0,
                  minWidth: theme.spacing(6),
                  width: theme.spacing(6),
                }}
                onClick={sub}
              >
                <RemoveIcon />
              </Button>
            </Stack>
          </InputAdornment>
        ),
      }}
    />
  );
}
