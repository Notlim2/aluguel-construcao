import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface QuestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
  text: string;
}

export default function QuestionDialog({
  isOpen,
  onClose,
  onOk,
  text,
}: QuestionDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent dividers>
        <Stack direction="row" alignItems="center" columnGap={2}>
          <QuestionMarkIcon fontSize="large" color="warning" />
          <DialogContentText>{text}</DialogContentText>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="success" variant="contained" onClick={onOk}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
