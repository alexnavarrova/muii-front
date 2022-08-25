import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import HttpCliente from 'src/services/HttpCliente';
import { useSnackbar } from 'notistack';
import Header from './Header';
import AnimalEditForm from './AnimalEditForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function AnimalEditView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [animal, setAnimal] = useState();
  const { animalId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const getAnimales = useCallback(() => {
    HttpCliente
      .get(`animal/${animalId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setAnimal(response.data);
        }
      })
      .catch((error) => {
        const { message } = error;
        enqueueSnackbar(message || 'Ha ocurrido un error, intente mas tarde', {
          variant: 'error'
        });
      });
  }, [isMountedRef, animalId, enqueueSnackbar]);

  useEffect(() => {
    getAnimales();
  }, [getAnimales]);

  if (!animal) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Customer Edit"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <AnimalEditForm animal={animal} />
        </Box>
      </Container>
    </Page>
  );
}

export default AnimalEditView;
