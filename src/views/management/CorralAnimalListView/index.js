import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import HttpCliente from 'src/services/HttpCliente';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CorralAnimalListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [corrales, setCorrales] = useState(null);

  const getCorrales = useCallback(() => {
    HttpCliente.get('corral')
      .then((response) => {
        if (isMountedRef.current) {
          setCorrales(response.data);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getCorrales();
  }, [getCorrales]);

  if (!corrales) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Consultar animales del corral"
    >
      <Container maxWidth={false}>
        <Header />
        {corrales && (
          <Box mt={3}>
            <Results corrales={corrales} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default CorralAnimalListView;
