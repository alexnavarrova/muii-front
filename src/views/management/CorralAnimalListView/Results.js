import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Link,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  SvgIcon,
  Select,
  MenuItem
} from '@material-ui/core';
import HttpCliente from 'src/services/HttpCliente';
import {
  Edit as EditIcon
} from 'react-feather';
import useIsMountedRef from 'src/hooks/useIsMountedRef';


const Results = ({ className, corrales, ...rest }) => {
  const [corralSelected, setCorralSelected] = useState('');
  const [animales, setAnimales] = useState([]);
  const isMountedRef = useIsMountedRef();

  const getAnimales = useCallback(() => {
    HttpCliente.get(`corral/${corralSelected}/animales`)
      .then((response) => {
        if (isMountedRef.current) {
          setAnimales(response.data);
        }
      });
  }, [isMountedRef, corralSelected]);

  useEffect(() => {
    if (corralSelected !== '') {
      getAnimales();
    }
  }, [getAnimales, corralSelected]);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box m={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Select
                fullWidth
                label="Seleccione el corral"
                name="corral"
                onChange={(e) => setCorralSelected(e.target.value)}
                value={corralSelected}
                variant="outlined"
              >
                {corrales.map(({ corralId, nombre }) => (
                  <MenuItem
                    key={`corrales-${corralId}`}
                    value={corralId}
                  >
                    {nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          { corralSelected !== '' && animales.length === 0 ? <p>El corral esta vacio</p> : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Edad</TableCell>
                  <TableCell>Alta Peligrosidad</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {animales?.map((animal) => (
                  <TableRow
                    hover
                    key={animal.animalId}
                  >
                    <TableCell>
                      <Link
                        variant="subtitle2"
                        color="textPrimary"
                        component={RouterLink}
                        underline="none"
                        to="#"
                      >
                        {animal.nombre}
                      </Link>
                    </TableCell>
                    <TableCell>
                      { animal.edad }
                    </TableCell>
                    <TableCell>
                      { animal.altaPeligrosidad ? 'Si' : 'No' }
                    </TableCell>
                    <TableCell>
                      <IconButton
                        component={RouterLink}
                        to={`/app/management/animales/${animal.animalId}/editar`}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};


Results.propTypes = {
  className: PropTypes.string,
  corrales: PropTypes.array
};

Results.defaultProps = {
  corrales: []
};

export default Results;
