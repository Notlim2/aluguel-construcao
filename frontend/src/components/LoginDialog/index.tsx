import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { Form, Formik, FormikValues } from 'formik';
import { useCallback } from 'react';
import { object, string } from 'yup';
import useAuth from '../../hooks/use-auth';
import { Divider, useMediaQuery, useTheme } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import TextFieldWrapper from '../TextFieldWrapper';

export default function LoginDialog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isOpenLoginDialog, toggleLoginDialog, isLoading, login } = useAuth();
  const handleSubmit = useCallback(
    (values: FormikValues) => {
      const { email, password } = values;
      login({ email, password });
    },
    [login]
  );
  return (
    <Dialog
      open={isOpenLoginDialog}
      onClose={toggleLoginDialog}
      fullScreen={isMobile}
    >
      <DialogTitle>Fazer Login</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={toggleLoginDialog}
        sx={(theme) => ({
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Formik
          validationSchema={object({
            email: string().email().required('Informe um e-mail!'),
            password: string().required('Informe uma senha!'),
          })}
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Stack rowGap={1} width={{ md: 280, lg: 360 }}>
              <TextFieldWrapper
                type="email"
                name="email"
                label="E-mail"
                required
              />
              <TextFieldWrapper
                type="password"
                name="password"
                label="Senha"
                required
              />
              <Divider />
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                fullWidth
              >
                <Stack direction="row" columnGap={1}>
                  {isLoading && <CircularProgress size="small" />}
                  <Typography>Login</Typography>
                </Stack>
              </Button>
            </Stack>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
