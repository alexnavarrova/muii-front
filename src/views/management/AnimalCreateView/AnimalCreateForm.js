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
  makeStyles,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import HttpCliente from 'src/services/HttpCliente';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AnimalCreateForm = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitFormik = async (values, { setSubmitting, resetForm }) => {
    try {
      await HttpCliente.post('/animal', { ...values });
      enqueueSnackbar('Animal agregado correctamente', {
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
        altaPeligrosidad: false,
        fechaNacimiento: '2000-01-01'
      }}
      validationSchema={Yup.object().shape({
        nombre: Yup.string().max(255).required('Campo requerido').nullable(),
        fechaNacimiento: Yup.date().required('Campo requerido')
      })}
      onSubmit={handleSubmitFormik}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
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
                  <KeyboardDatePicker
                    error={Boolean(touched.fechaNacimiento && errors.fechaNacimiento)}
                    fullWidth
                    onBlur={handleBlur}
                    onChange={(val) => { setFieldValue('fechaNacimiento', val); }}
                    label="Fecha de Nacimiento"
                    helperText={touched.fechaNacimiento && errors.fechaNacimiento}
                    format="MM/DD/YYYY"
                    name="fechaNacimiento"
                    inputVariant="outlined"
                    value={values.fechaNacimiento}
                    okLabel="Ok"
                    cancelLabel="Cancel"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={values.altaPeligrosidad}
                        edge="start"
                        name="altaPeligrosidad"
                        onChange={handleChange}
                      />
                    )}
                    label="Alta Peligrosidad"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  {/* <FormControl>
                    <InputLabel id="mutiple-select-label">Animales que no convive</InputLabel>
                  </FormControl> */}
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
                  Actualizar Animal
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

AnimalCreateForm.propTypes = {
  className: PropTypes.string
};

export default AnimalCreateForm;
