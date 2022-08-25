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
import requestGenerico from 'src/services/HttpCliente';
import CorralEditForm from './CorralEditForm';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function CorralEditView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [corral, setCorral] = useState();
  const { corralId } = useParams();

  const getCustomer = useCallback(() => {
    requestGenerico
      .get(`corral/${corralId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setCorral(response.data);
        }
      });
  }, [isMountedRef, corralId]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  if (!corral) {
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
          <CorralEditForm corral={corral} />
        </Box>
      </Container>
    </Page>
  );
}

export default CorralEditView;
