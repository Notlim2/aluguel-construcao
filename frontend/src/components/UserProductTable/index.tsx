import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { UserProduct } from '../../types/userProduct';
import {
  findCartItemsService,
  removeUserProductService,
  updateUserProductService,
} from '../../services/userProduct';
import ImageWrapper from '../ImageWrapper';
import formatMoney from '../../helpers/formatMoney';
import { Delete as DeleteIcon } from '@mui/icons-material';
import CountInput from '../CountInput';
import RentalDaysSelector from '../RentalDays';
import QuestionDialog from '../QuestionDialog';
import getItemTotal from '../../helpers/getItemTotal';
import { Divider, useMediaQuery, useTheme } from '@mui/material';
import UserProductMobileCard from '../UserProductMobileCard';

const TABLE_HEADERS_COUNT = 7;

export default function UserProductTable() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [isOpenQuestionDialog, setIsOpenQuestionDialog] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [removingUserProductId, setRemovingUserProductId] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const getUserProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: foundProducts } = await findCartItemsService();
      setUserProducts(foundProducts);
    } catch (e) {
      setError(
        'Houve um problema ao obter os itens do carrinho, tente novamente mais tarde!'
      );
    }
    setIsLoading(false);
  }, []);
  const updateUserProductAttribute = useCallback(
    (id: string, attribute: 'quantity' | 'rentalDays', newValue: number) => {
      const foundUserProduct = userProducts.find((up) => up.id === id);
      if (foundUserProduct) {
        foundUserProduct[attribute] = newValue;
        setUserProducts([...userProducts]);
      }
    },
    [userProducts]
  );
  const handleChangeRentalDays = useCallback(
    async (id: string, newRentalDays: number) => {
      setIsLoadingUpdate(true);
      try {
        await updateUserProductService(id, { rentalDays: newRentalDays });
        setSuccessMsg('Tempo de aluguel alterado com sucesso!');
        updateUserProductAttribute(id, 'rentalDays', newRentalDays);
      } catch (e) {
        setError(
          'Houve um problema ao editar o tempo de aluguel, tente novamente mais tarde!'
        );
      }
      setIsLoadingUpdate(false);
    },
    [updateUserProductAttribute]
  );
  const handleChangeQuantity = useCallback(
    async (id: string, newQuantity: number) => {
      if (!newQuantity) {
        return;
      }
      setIsLoadingUpdate(true);
      try {
        await updateUserProductService(id, { quantity: newQuantity });
        setSuccessMsg('Quantidade alterada com sucesso!');
        updateUserProductAttribute(id, 'quantity', newQuantity);
      } catch (e) {
        setError(
          'Houve um problema ao editar a quantidade, tente novamente mais tarde!'
        );
      }
      setIsLoadingUpdate(false);
    },
    [updateUserProductAttribute]
  );
  const askRemoveUserProduct = useCallback((id: string) => {
    setRemovingUserProductId(id);
    setQuestionText('Deseja remover este item do carrinho ?');
    setIsOpenQuestionDialog(true);
  }, []);
  const removeUserProduct = useCallback(async () => {
    try {
      await removeUserProductService(removingUserProductId);
      setSuccessMsg('Produto removido do carrinho com sucesso!');
    } catch (e) {
      setError(
        'Houve um problema ao remover o item do carrinho, tente novamente mais tarde!'
      );
    }
    setIsOpenQuestionDialog(false);
  }, [removingUserProductId]);
  useEffect(() => {
    getUserProducts();
  }, [getUserProducts]);
  return (
    <>
      <Stack rowGap={1}>
        {isTablet ? (
          <Stack rowGap={1}>
            {userProducts.map((up) => (
              <Fragment key={up.id}>
                <UserProductMobileCard
                  userProduct={up}
                  askRemoveUserProduct={askRemoveUserProduct}
                  changeQuantity={handleChangeQuantity}
                  changeRentalDays={handleChangeRentalDays}
                  isLoadingUpdate={isLoadingUpdate}
                />
                <Divider />
              </Fragment>
            ))}
          </Stack>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={120}>Imagem</TableCell>
                <TableCell width={200}>Nome</TableCell>
                <TableCell>Valor Unit.</TableCell>
                <TableCell width={140}>Quantidade</TableCell>
                <TableCell>Tempo de Aluguel</TableCell>
                <TableCell width={160}>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={TABLE_HEADERS_COUNT}>
                    <Stack direction="row" justifyContent="center">
                      <CircularProgress />
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : userProducts.length ? (
                userProducts.map((up) => (
                  <TableRow key={up.id}>
                    <TableCell>
                      <ImageWrapper
                        alt="produto"
                        height={120}
                        src={up.product.imageUrl}
                      />
                    </TableCell>
                    <TableCell>{up.product.name}</TableCell>
                    <TableCell>{formatMoney(up.product.value)}</TableCell>
                    <TableCell>
                      <CountInput
                        label=""
                        value={up.quantity}
                        setValue={(newQuantity) =>
                          handleChangeQuantity(up.id, newQuantity)
                        }
                        disabled={isLoadingUpdate}
                      />
                    </TableCell>
                    <TableCell>
                      <RentalDaysSelector
                        label="Alugar por"
                        value={up.rentalDays}
                        setValue={(newRentalDays) =>
                          handleChangeRentalDays(up.id, newRentalDays)
                        }
                        disabled={isLoadingUpdate}
                      />
                    </TableCell>
                    <TableCell>
                      Total:{' '}
                      {formatMoney(
                        getItemTotal({
                          quantity: up.quantity,
                          rentalDays: up.rentalDays,
                          value: up.product.value,
                        })
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Remover item">
                        <Button
                          color="error"
                          onClick={() => askRemoveUserProduct(up.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={TABLE_HEADERS_COUNT}>
                    <Typography textAlign="center">
                      Não existem items no seu carrinho!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <Stack direction="row" justifyContent="end">
          <Typography fontWeight="bold" fontSize="1.45rem">
            Total:{' '}
            {formatMoney(
              userProducts
                .map((up) =>
                  getItemTotal({
                    quantity: up.quantity,
                    value: up.product.value,
                    rentalDays: up.rentalDays,
                  })
                )
                .reduce((t1, t2) => t1 + t2, 0)
            )}
          </Typography>
        </Stack>
      </Stack>
      <Snackbar color="error" open={!!error} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        color="success"
        open={!!successMsg}
        onClose={() => setSuccessMsg('')}
      >
        <Alert severity="success" onClose={() => setSuccessMsg('')}>
          {successMsg}
        </Alert>
      </Snackbar>
      <QuestionDialog
        isOpen={isOpenQuestionDialog}
        onClose={() => setIsOpenQuestionDialog(false)}
        onOk={removeUserProduct}
        text={questionText}
      />
    </>
  );
}
