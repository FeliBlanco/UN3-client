import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import axios from "axios";

export default function Clientes() {

    const [getClients, setClients] = useState(null)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    useEffect(() => {
        (async () => {
            try {
                setClients(null)
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user?perPage=${rowsPerPage}&page=${page}`)
                console.log(response.data)
                setClients(response.data)
            }
            catch(err) {
                console.log(err)
            }
        })()
    }, [page, rowsPerPage])


    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };



    return (
        <div>
            <Menu />
             <Box sx={{padding:'20px'}}>
                <Box textAlign={"right"}>
                    <Button sx={{margin:'20px'}} variant="contained" onClick={() => window.location.href = "/client/crear"}>Agregar cliente</Button>
                </Box>
                {
                    getClients != null &&
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>DNI</TableCell>
                                    <TableCell>Celular</TableCell>
                                    <TableCell>Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getClients?.data?.map((value, index) => {
                                    return (
                                        <TableRow key={`use-${index}`}>
                                            <TableCell>{value.firtname} {value.lastname}</TableCell>
                                            <TableCell>{value.documento}</TableCell>
                                            <TableCell>{value.celular}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => window.location.href = `/client/${value._id}/edit`}>Editar</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={getClients?.count}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                                </TableFooter>
                        </Table>
                    </TableContainer>
                }
            </Box>
        </div>
    )
}