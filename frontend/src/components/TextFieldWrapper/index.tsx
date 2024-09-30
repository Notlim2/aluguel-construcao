import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';

interface TextFieldWrapperProps
  extends Omit<TextFieldProps, 'name' | 'onChange' | 'value'> {
  name: string;
}

export default function TextFieldWrapper({
  name,
  ...otherProps
}: TextFieldWrapperProps) {
  const [field, meta] = useField(name);

  const configTextField = {
    fullWidth: true,
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  } else {
    configTextField.error = false;
    configTextField.helperText = '';
  }

  return <TextField {...(configTextField as TextFieldProps)} />;
}
