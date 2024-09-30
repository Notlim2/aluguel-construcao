import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { UserProduct } from '../../types/userProduct';
import ImageWrapper from '../ImageWrapper';
import CountInput from '../CountInput';
import RentalDaysSelector from '../RentalDays';
import formatMoney from '../../helpers/formatMoney';
import getItemTotal from '../../helpers/getItemTotal';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material';

interface UserProductMobileCardProps {
  userProduct: UserProduct;
  changeQuantity: (id: string, newQuantity: number) => void;
  changeRentalDays: (id: string, newRentalDays: number) => void;
  askRemoveUserProduct: (id: string) => void;
  isLoadingUpdate: boolean;
}

export default function UserProductMobileCard({
  userProduct,
  changeQuantity,
  changeRentalDays,
  askRemoveUserProduct,
  isLoadingUpdate,
}: UserProductMobileCardProps) {
  const theme = useTheme();
  return (
    <Card elevation={4} sx={{ p: 1, position: 'relative' }}>
      <Stack rowGap={1}>
        <ImageWrapper
          alt="produto"
          height={320}
          src={userProduct.product.imageUrl}
        />
        <Stack rowGap={1}>
          <Typography fontWeight="bold">{userProduct.product.name}</Typography>
          <Divider />
          <Tooltip title={userProduct.product.description}>
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {userProduct.product.description}
            </Typography>
          </Tooltip>
          <Divider />
          <CountInput
            label=""
            value={userProduct.quantity}
            setValue={(newQuantity) =>
              changeQuantity(userProduct.id, newQuantity)
            }
            disabled={isLoadingUpdate}
          />
          <Divider />
          <RentalDaysSelector
            label="Alugar por"
            value={userProduct.rentalDays}
            setValue={(newRentalDays) =>
              changeRentalDays(userProduct.id, newRentalDays)
            }
            disabled={isLoadingUpdate}
          />
          <Divider />
          <Typography textAlign="end" fontWeight="bold">
            Total:{' '}
            {formatMoney(
              getItemTotal({
                quantity: userProduct.quantity,
                rentalDays: userProduct.rentalDays,
                value: userProduct.product.value,
              })
            )}
          </Typography>
          <Tooltip title="Remover item do carrinho">
            <IconButton
              color="error"
              sx={{
                position: 'absolute',
                top: theme.spacing(1),
                right: theme.spacing(1),
              }}
              onClick={() => askRemoveUserProduct(userProduct.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}
