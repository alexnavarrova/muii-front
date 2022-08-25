import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import CorralCreateForm from './CorralCreateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function CorralCreateView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Crear Animal"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <CorralCreateForm />
        </Box>
      </Container>
    </Page>
  );
}

export default CorralCreateView;
