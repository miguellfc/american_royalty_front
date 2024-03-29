import {
    Box, Grid, Paper, Table,
    TableBody, TableCell, TableContainer, TableRow
} from "@mui/material";
import Worker from "./Worker.jsx";
import TableToolbar from "../../../components/TableToolbar.jsx";
import TableHeaders from "../../../components/TableHeaders.jsx";
import PaginationBar from "../../../components/PaginationBar.jsx";

const Workers = (
    {
        workers, deleteWorkers, page, limit, total, controlPagination, selected,
        setSelected, setDataEdit, filter, setFilter
    }
) => {

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = workers.map((n) => n.id_usuario);
            setSelected(newSelected);
            return;
        }

        setSelected([]);
    };
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        selectedIndex === -1
            ? newSelected = [...selected, id]
            : newSelected = selected.filter((select) => select !== id );

        setSelected(newSelected);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = limit - workers.length;
    const columns = ["Avatar", "Nombre y Apellido", "Email", "Puesto", "Phone"];

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{width: '100%'}}>
                    <Paper sx={{width: '100%', mb: 2}}>
                        <TableToolbar
                            title="Trabajadores"
                            selections={selected}
                            deleteData={deleteWorkers}
                            message="Está seguro que desea eliminar los trabajadores seleccionados?"
                            filter={filter}
                            setFilter={setFilter}
                        />
                        <TableContainer>
                            <Table
                                sx={{minWidth: 750}}
                                aria-labelledby="tableTitle"
                                size="large"
                            >
                                <TableHeaders
                                    headCells={columns}
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={workers.length}
                                />
                                <TableBody>
                                    {
                                        workers.map((row, index) => (
                                            <Worker
                                                isSelected={isSelected}
                                                handleClick={handleClick}
                                                deleteData={deleteWorkers}
                                                index={index}
                                                setDataEdit={setDataEdit}
                                                data={row}
                                                setFilter={setFilter}
                                            />
                                        ))
                                    }
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 75 * emptyRows
                                            }}
                                        >
                                            <TableCell colSpan={8}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignContent: "center",
                            height: 60
                        }}>
                            <PaginationBar
                                totalPages={total}
                                page={page}
                                setPage={controlPagination}
                            />
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </>
    )
}

export default Workers;