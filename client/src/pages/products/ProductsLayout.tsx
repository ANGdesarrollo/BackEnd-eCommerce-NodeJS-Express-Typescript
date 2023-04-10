import MaterialReactTable, {MRT_ColumnDef, MRT_Row} from "material-react-table";
import {Box, Button, IconButton, Tooltip} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {CreateNewProductModal} from "./components/CreateNewProductModal";
import {Dispatch} from "react";
import {CreatedProduct, IProduct} from "../../interfaces/interfaceProduct";

interface props {
    columns: MRT_ColumnDef<IProduct>[];
    tableData: IProduct[];
    handleSaveRowEdits: any;
    handleCancelRowEdits: () => void;
    handleDeleteRow: (row: MRT_Row<IProduct>) => void;
    setCreateModalOpen: Dispatch<any>;
    createModalOpen: boolean;
    handleCreateNewRow: (values: CreatedProduct) => void;
}

export const ProductsLayout = ({
                                   columns,
                                   tableData,
                                   handleSaveRowEdits,
                                   handleCancelRowEdits,
                                   handleDeleteRow,
                                   setCreateModalOpen,
                                   handleCreateNewRow,
                                   createModalOpen
                               }: props) => {
    return (
        <>
            <MaterialReactTable
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                        size: 120,
                    },
                }}
                columns={columns}
                data={tableData}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({row, table}) => (
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        color="primary"
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                    >
                        Create New Product
                    </Button>
                )}
            />
            <CreateNewProductModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
    );
};
