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


const Results = ({ className, corrales, ...rest }) => 
<Card {...rest}>
  <PerfectScrollbar>
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Limite</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {corrales?.map((corral) => (
            <TableRow
              hover
              key={corral.corralId}
            >
              <TableCell>
                <Link
                  variant="subtitle2"
                  color="textPrimary"
                  component={RouterLink}
                  underline="none"
                  to="#"
                >
                  {corral.nombre}
                </Link>
              </TableCell>
              <TableCell align='right'>
                { corral.limite }
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  component={RouterLink}
                  to={`/app/management/corrales/${corral.corralId}/editar`}
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
  corrales: PropTypes.array
};

Results.defaultProps = {
  corrales: []
};

export default Results;
