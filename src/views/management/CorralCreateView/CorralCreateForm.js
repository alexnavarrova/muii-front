import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { regExpOnlyNumbers } from 'src/utils/regExp';
import HttpCliente from 'src/services/HttpCliente';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CorralCreateForm = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitFormik = async (values, { setSubmitting, resetForm }) => {
    try {
      await HttpCliente.post('/corral', { ...values });
      enqueueSnackbar('Corral agregado correctamente', {
        variant: 'success'
      });
      setSubmitting(true);
      resetForm();
    } catch (error) {
      setSubmitting(false);
      const { message } = error;
      enqueueSnackbar(message || 'Ha ocurrido un error, intente mas tarde', {
        variant: 'error'
      });
    }
  };

  return (
    <Formik
      initialValues={{
        nombre: '',
        limite: ''
      }}
      validationSchema={Yup.object().shape({
        nombre: Yup.string().max(255).required('Campo requerido').nullable(),
        limite: Yup.string().required('Campo requerido').matches(regExpOnlyNumbers, 'Ingrese solo números').nullable(),
      })}
      onSubmit={handleSubmitFormik}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >

          <Card>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.nombre && errors.nombre)}
                    fullWidth
                    helperText={touched.nombre && errors.nombre}
                    label="Nombre"
                    name="nombre"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.nombre}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.limite && errors.limite)}
                    fullWidth
                    helperText={touched.limite && errors.limite}
                    label="Limite"
                    name="limite"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.limite}
                    variant="outlined"
                  />
                </Grid>
                <Grid item />
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Agregar Corral
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

CorralCreateForm.propTypes = {
  className: PropTypes.string
};

export default CorralCreateForm;
