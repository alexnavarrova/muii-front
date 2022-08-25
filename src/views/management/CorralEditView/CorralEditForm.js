import React, { useCallback, useEffect, useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Checkbox
} from '@material-ui/core';
import { regExpOnlyNumbers } from 'src/utils/regExp';
import HttpCliente from 'src/services/HttpCliente';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {}
}));

function CorralEditForm({
  className,
  corral,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [animales, setAnimales] = useState([]);
  const [animalesCorral, setAnimalesCorral] = useState(corral.animales.map((x) => x.animalId));

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

  const handleChangeSelected = (event) => {
    const { value } = event.target;
    setAnimalesCorral(value);
  };

  const handleSubmitFormik = async (values, { setSubmitting }) => {
    try {
      await HttpCliente.put('corral', { ...values, animales: animalesCorral.map((x) => ({ animalId: x })) });
      enqueueSnackbar('Corral actualizado correctamente', {
        variant: 'success'
      });
      setSubmitting(true);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      const { message } = errorObject.data;
      setSubmitting(false);
      enqueueSnackbar(message || 'Ha ocurrido un error, intente mas tarde', {
        variant: 'error'
      });
    }
  };

  return (
    <Formik
      initialValues={{
        id: corral.corralId || '',
        nombre: corral.nombre || '',
        limite: corral.limite || ''
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
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormControl className={classes.formControl} style={{ width: '100%' }}>
                    <InputLabel id="mutiple-select-label">Animales de mi corral</InputLabel>
                    <Select
                      labelId="mutiple-select-label"
                      multiple
                      value={animalesCorral}
                      onChange={handleChangeSelected}
                      renderValue={(x) => [x.map((j) => (animales.find((a) => a.animalId === j)?.nombre))].join(', ')}
                    >
                      <MenuItem
                        value="all"
                      >
                        <ListItemText
                          classes={{ primary: classes.selectAllText }}
                          primary="Select All"
                        />
                      </MenuItem>
                      {animales.map((option) => (
                        <MenuItem key={option.animalId} value={option.animalId}>
                          <ListItemIcon>
                            <Checkbox checked={animalesCorral.indexOf(option.animalId) > -1} />
                          </ListItemIcon>
                          <ListItemText primary={option.nombre} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                  Actualizar Corral
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}

CorralEditForm.propTypes = {
  className: PropTypes.string,
  corral: PropTypes.object.isRequired
};

export default CorralEditForm;
