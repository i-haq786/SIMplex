import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

const AllCustomers: React.FC = () => {

    const [customers, setCustomers] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchCustomers();
        }, []);


    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:1002/api/Customer');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <Typography variant="h4" align="center" fontWeight="medium" fontFamily="monospace" gutterBottom>
            All Customers
            </Typography>
            <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f0aa00' }}>  
                <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Date of Birth</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => (
                <TableRow key={customer.uid}>
                    <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.dob}</TableCell>
                    <TableCell>{customer.state}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={customers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Container>
    );
};

export default AllCustomers;
