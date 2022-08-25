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
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Checkbox
} from '@material-ui/core';
import HttpCliente from 'src/services/HttpCliente';
import { KeyboardDatePicker } from '@material-ui/pickers';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {}
}));

function AnimalEditForm({
  className,
  animal,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [animalesNoConvive, setAnimalesNoConvive] = useState(animal.animalNoConvive.map((x) => x.animalId));
  const [animales, setAnimales] = useState([]);

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


  if (!animal) {
    return null;
  }

  const handleChangeSelected = (event) => {
    const { value } = event.target;
    setAnimalesNoConvive(value);
  };


  const handleSubmitFormik = async (values, { setSubmitting }) => {
    try {
      await HttpCliente.put('animal', { ...values, restrincionAnimal: animalesNoConvive.map((x) => ({ animalId: x })) });
      enqueueSnackbar('Animal actualizado correctamente', {
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
        id: animal.animalId || '',
        nombre: animal.nombre || '',
        altaPeligrosidad: animal.altaPeligrosidad || false,
        fechaNacimiento: animal.fechaNacimiento || '',
        animalesNoConvive: []
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
                  <FormControl className={classes.formControl} style={{ width: '100%' }}>
                    <InputLabel id="mutiple-select-label">Animales que no convive</InputLabel>
                    <Select
                      labelId="mutiple-select-label"
                      multiple
                      value={animalesNoConvive}
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
                            <Checkbox checked={animalesNoConvive.indexOf(option.animalId) > -1} />
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
                  Actualizar Animal
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}

AnimalEditForm.propTypes = {
  className: PropTypes.string,
  animal: PropTypes.object.isRequired
};

export default AnimalEditForm;
