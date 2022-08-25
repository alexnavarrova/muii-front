/* eslint-disable max-len */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  SvgIcon
} from '@material-ui/core';

import {
  Edit as EditIcon
} from 'react-feather';


const Results = ({ className, animales, ...rest }) => 
<Card {...rest}>
  <PerfectScrollbar>
    <Box>
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
    </Box>
  </PerfectScrollbar>
</Card>

Results.propTypes = {
  className: PropTypes.string,
  animales: PropTypes.array
};

Results.defaultProps = {
  animales: []
};

export default Results;
