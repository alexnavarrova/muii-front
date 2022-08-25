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
import requestGenerico from 'src/services/HttpCliente';
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

const CorralListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [corrales, setCorrales] = useState(null);

  const getCorrales = useCallback(() => {
    requestGenerico.get('corral')
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
      title="Lista de Corrales"
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

export default CorralListView;
