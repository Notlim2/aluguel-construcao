import type { NextPage } from 'next';
import Layout from '../layout';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useCallback, useEffect, useState } from 'react';
import Product from '../types/products';
import ProductCard from '../components/ProductCard';
import { getProductsService } from '../services/products';
import { Search as SearchIcon } from '@mui/icons-material';
import { Form, Formik, FormikValues } from 'formik';
import TextFieldWrapper from '../components/TextFieldWrapper';

const ITEMS_PER_PAGE = 12;

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const getProducts = useCallback(
    async (search?: string) => {
      setIsLoading(true);
      try {
        const { data, headers } = await getProductsService({
          search,
          skip: (page - 1) * ITEMS_PER_PAGE,
          take: ITEMS_PER_PAGE,
        });
        const newCount = headers?.['query-size'];
        setCount(newCount);
        setProducts(data);
      } catch (e) {
        setError(
          'Houve um problema ao buscar os materiais para aluguel, tente novamente mais tarde!'
        );
      }
      setIsLoading(false);
    },
    [page]
  );
  const handleSearch = useCallback(
    (values: FormikValues) => {
      getProducts(values.search);
    },
    [getProducts]
  );
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <>
      <Layout>
        <Stack paddingTop={2} rowGap={1}>
          <Typography variant="h4">Todos os Materiais para Aluguel</Typography>
          <Divider />
          <Formik initialValues={{ search: '' }} onSubmit={handleSearch}>
            <Form>
              <Stack direction="row" columnGap={1}>
                <TextFieldWrapper
                  fullWidth
                  name="search"
                  label="Pesquisar..."
                />
                <Button variant="contained">
                  <SearchIcon />
                </Button>
              </Stack>
            </Form>
          </Formik>
          <Divider />
          <Grid container xs={12} columnSpacing={1} rowSpacing={1}>
            {isLoading ? (
              <Grid item xs={12}>
                <Stack alignItems="center">
                  <CircularProgress />
                </Stack>
              </Grid>
            ) : (
              products.map((p) => (
                <Grid item key={p.id} xs={12} md={4} lg={3}>
                  <ProductCard product={p} />
                </Grid>
              ))
            )}
          </Grid>
          <Divider />
          <Stack direction="row" justifyContent="end" sx={{ mb: 1 }}>
            <Pagination
              count={Math.ceil(count / ITEMS_PER_PAGE)}
              page={page}
              onChange={(_e, newPage) => setPage(newPage)}
            />
          </Stack>
        </Stack>
      </Layout>
      <Snackbar open={!!error} color="error" onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
