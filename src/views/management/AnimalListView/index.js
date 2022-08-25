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

const AnimalListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [animales, setAnimales] = useState(null);

  const getAnimales = useCallback(() => {
    HttpCliente.get('animal')
      .then((response) => {
        if (isMountedRef.current) {
          setAnimales(response.data);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getAnimales();
  }, [getAnimales]);

  if (!animales) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Lista de Animales"
    >
      <Container maxWidth={false}>
        <Header />
        {animales && (
          <Box mt={3}>
            <Results animales={animales} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default AnimalListView;
