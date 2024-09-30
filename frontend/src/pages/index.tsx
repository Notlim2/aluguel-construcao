import type { NextPage } from 'next';
import Layout from '../layout';
import Stack from '@mui/material/Stack';
import ProductsSlider from '../components/ProductsSlider';

const Home: NextPage = () => {
  return (
    <Layout>
      <Stack paddingTop={2}>
        <ProductsSlider />
      </Stack>
    </Layout>
  );
};

export default Home;
