import type { NextPage } from 'next';
import Layout from '../../layout';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ImageWrapper from '../../components/ImageWrapper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Product from '../../types/products';
import { useRouter } from 'next/router';
import { getProductService } from '../../services/products';
import { findCartItemsService } from '../../services/userProduct';
import formatMoney from '../../helpers/formatMoney';
import CountInput from '../../components/CountInput';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { addToCartService } from '../../services/userProduct';
import RentalDaysSelector from '../../components/RentalDays';
import getItemTotal from '../../helpers/getItemTotal';
import useAuth from '../../hooks/use-auth';
import { UserProduct } from '../../types/userProduct';
import { useMediaQuery, useTheme } from '@mui/material';

const ProductPage: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const { isAuthenticated, toggleLoginDialog } = useAuth();
  const router = useRouter();
  const productId = router.query.id as string;
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [rentalDays, setRentalDays] = useState(1);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
  const getProduct = useCallback(async () => {
    if (!productId) {
      return;
    }
    setIsLoading(true);
    try {
      const { data: foundProduct } = await getProductService(productId);
      setProduct(foundProduct);
    } catch (e) {
      setError(
        'Houve um erro ao buscar pelo produto, tente novamente mais tarde!'
      );
    }
    setIsLoading(false);
  }, [productId]);
  const getUserProducts = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }
    setIsLoading(true);
    try {
      const { data: foundUserProducts } = await findCartItemsService();
      setUserProducts(foundUserProducts);
    } catch (e) {}
    setIsLoading(false);
  }, [isAuthenticated]);
  const isAddedToCart = useMemo(() => {
    return userProducts.map((up) => up.product.id).includes(productId);
  }, [productId, userProducts]);
  const addToCart = useCallback(async () => {
    if (!isAuthenticated) {
      toggleLoginDialog();
      return;
    }
    setIsLoadingAddToCart(true);
    try {
      await addToCartService({ productId, quantity, rentalDays });
      setSuccessMsg('Produto adicionado ao carrinho com sucesso!');
    } catch (e) {
      setError(
        'Houve um erro ao adicionar o produto ao carrinho, tente novamente mais tarde!'
      );
    }
    setIsLoadingAddToCart(false);
  }, [productId, quantity, rentalDays, isAuthenticated, toggleLoginDialog]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  useEffect(() => {
    getUserProducts();
  }, [getUserProducts]);
  return (
    <>
      <Layout>
        <Stack paddingTop={2}>
          {!product && isLoading ? (
            <Stack
              width="100%"
              height={640}
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress />
            </Stack>
          ) : !!product ? (
            <>
              <Grid container xs={12}>
                <Grid item xs={12} lg={7}>
                  <ImageWrapper
                    src={product.imageUrl}
                    alt="produto"
                    height={isTablet && !isMobile ? 480 : isMobile ? 340 : 640}
                  />
                </Grid>
                <Grid item xs={12} lg={5} sx={{ pl: 1 }}>
                  <Stack sx={{ height: '100%', justifyContent: 'center' }}>
                    <Stack rowGap={1}>
                      <Typography variant="h4" fontWeight="bold" sx={{ mx: 1 }}>
                        {product.name}
                      </Typography>
                      <Divider />
                      <Typography sx={{ mx: 1 }}>
                        {product.description}
                      </Typography>
                      <Divider />
                      <Typography sx={{ mx: 1 }} textAlign="right">
                        <Typography
                          fontWeight="bold"
                          component="span"
                          fontSize="1.6rem"
                        >
                          {formatMoney(product.value)}
                        </Typography>{' '}
                        <Typography component="span">por dia</Typography>
                      </Typography>
                      <Divider />
                      <CountInput
                        label="Quantidade"
                        value={quantity}
                        setValue={setQuantity}
                      />
                      <Divider />
                      <RentalDaysSelector
                        label="Alugar por"
                        value={rentalDays}
                        setValue={setRentalDays}
                      />
                      <Divider />
                      <Typography sx={{ mx: 1 }} textAlign="right">
                        <Typography
                          component="span"
                          fontSize="1.6rem"
                          fontWeight="bold"
                          textTransform="uppercase"
                        >
                          Total:{' '}
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          component="span"
                          fontSize="1.6rem"
                        >
                          {formatMoney(
                            getItemTotal({
                              quantity,
                              rentalDays,
                              value: product.value,
                            })
                          )}
                        </Typography>
                      </Typography>
                      <Divider />
                      <Button
                        variant="contained"
                        sx={{ py: 2 }}
                        color={isAddedToCart ? 'primary' : 'success'}
                        onClick={addToCart}
                        disabled={quantity <= 0 || isLoadingAddToCart}
                      >
                        {isLoadingAddToCart ? (
                          <Stack direction="row" alignItems="center">
                            <CircularProgress />
                          </Stack>
                        ) : (
                          <Stack direction="row" columnGap={1}>
                            <ShoppingCartIcon />
                            <Typography>
                              {isAddedToCart
                                ? 'Ver carrinho'
                                : 'Adicionar ao carrinho'}
                            </Typography>
                          </Stack>
                        )}
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography>Produto não encontrado!</Typography>
          )}
        </Stack>
      </Layout>
      <Snackbar open={!!successMsg} color="success">
        <Alert severity="success" onClose={() => setSuccessMsg('')}>
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} color="error">
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductPage;
