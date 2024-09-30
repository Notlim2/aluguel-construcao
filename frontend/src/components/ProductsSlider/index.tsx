import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProductCard from '../ProductCard';
import Divider from '@mui/material/Divider';
import { useCallback, useEffect, useRef, useState } from 'react';
import Product from '../../types/products';
import { getProductsService } from '../../services/products';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import RoundedFloatingButton from '../RoundedFloatingButton';
import { useRouter } from 'next/router';

const DEFAULT_TAKE = 12;
const DEFAULT_SKIP = 0;
const CARD_SIZE = 280 + 32;

export default function ProductsSlider() {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [actualScroll, setActualScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getProductsService({
        skip: DEFAULT_SKIP,
        take: DEFAULT_TAKE,
      });
      setProducts(data);
    } catch (e) {
      setError(
        'Houve um problema ao buscar os materiais para aluguel, tente novamente mais tarde!'
      );
    }
    setIsLoading(false);
  }, []);
  const goLeft = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }
    sliderRef.current.scrollLeft -= CARD_SIZE;
    setActualScroll(sliderRef.current.scrollLeft);
  }, []);
  const goRight = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }
    const newScrollLeft = sliderRef.current.scrollLeft + CARD_SIZE;
    sliderRef.current.scrollLeft += CARD_SIZE;
    setActualScroll(newScrollLeft);
  }, []);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  useEffect(() => {
    if (sliderRef.current) {
      setActualScroll(sliderRef.current.scrollLeft);
      setMaxScroll(
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
    }
  }, [sliderRef]);
  return (
    <>
      <Stack ref={sliderRef}>
        <Typography variant="h4">Materiais para Aluguel</Typography>
        <Divider />
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        ) : (
          <Box position="relative">
            <Stack
              ref={sliderRef}
              direction="row"
              overflow="scroll"
              columnGap={2}
              sx={{ px: 2, py: 2, scrollBehavior: 'smooth' }}
            >
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </Stack>
            {actualScroll > 0 && (
              <RoundedFloatingButton
                icon={<ChevronLeft />}
                isLeft
                onClick={goLeft}
              />
            )}
            {actualScroll < maxScroll && (
              <RoundedFloatingButton
                icon={<ChevronRight />}
                onClick={goRight}
              />
            )}
          </Box>
        )}
        <Divider sx={{ my: 1 }} />
        <Stack justifyContent="center" direction="row">
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={() => router.push('/produtos')}
          >
            Ver Todos
          </Button>
        </Stack>
      </Stack>
      <Snackbar open={!!error} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
}
