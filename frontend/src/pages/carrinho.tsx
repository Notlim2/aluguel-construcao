import type { NextPage } from 'next';
import Layout from '../layout';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import UserProductTable from '../components/UserProductTable';

const Home: NextPage = () => {
  return (
    <Layout>
      <Stack paddingTop={2}>
        <Typography variant="h4">Meu Carrinho</Typography>
        <Divider />
        <UserProductTable />
      </Stack>
    </Layout>
  );
};

export default Home;
