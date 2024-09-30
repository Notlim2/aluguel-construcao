import Product from '../../types/products';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import formatMoney from '../../helpers/formatMoney';
import ImageWrapper from '../ImageWrapper';
import { useRouter } from 'next/router';
import goToProductPage from '../../helpers/goToProductPage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  return (
    <Card
      elevation={2}
      sx={{ minWidth: 280, cursor: 'pointer' }}
      onClick={() => goToProductPage(product.id, router.push)}
    >
      <Stack height="100%" rowGap={1}>
        <ImageWrapper src={product.imageUrl} alt="produto" height={260} />
        <Divider />
        <Typography fontWeight="bold" fontSize="large" sx={{ mx: 1 }}>
          {product.name}
        </Typography>
        <Divider />
        <Typography
          flexGrow={1}
          sx={{
            mx: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.description}
        </Typography>
        <Divider />
        <Typography sx={{ mx: 1 }} textAlign="right">
          <Typography component="span" fontWeight="bold">
            {formatMoney(product.value)}
          </Typography>{' '}
          <Typography component="span">por dia</Typography>
        </Typography>
        <Divider />
        <Button variant="contained" color="success" sx={{ mx: 1, mb: 1 }}>
          <Stack direction="row" columnGap={1}>
            Ver Detalhes
          </Stack>
        </Button>
      </Stack>
    </Card>
  );
}
