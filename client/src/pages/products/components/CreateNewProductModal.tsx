import {useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {CreatedProduct, IProduct} from "../../../interfaces/interfaceProduct";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {useValidators} from "../../../hooks/useValidators";

interface CreateModalProps {
    columns: MRT_ColumnDef<IProduct>[];
    onClose: () => void;
    onSubmit: (values: CreatedProduct) => void;
    open: boolean;
}

export const CreateNewProductModal = ({
                                          open,
                                          columns,
                                          onClose,
                                          onSubmit,
                                      }: CreateModalProps) => {

    const excludedKeys = new Set(['_id', 'createdAt', 'updatedAt', 'soldQty']);

    const [values, setValues] = useState<any>(() =>
        columns.reduce((acc, column) => {
            if (typeof column.accessorKey !== 'undefined' && !excludedKeys.has(column.accessorKey)) {
                acc[column.accessorKey] = '';
            }
            return acc;
        }, {} as any)
    );


    const handleSubmit = async() => {
        const { validateEmptyFields } = useValidators();
        const validateProduct = await validateEmptyFields(values);
        if(validateProduct) {
            onSubmit(values);
            onClose();
        }
    };

    const createInputsDialog = (column: MRT_ColumnDef<IProduct>): JSX.Element | null => {
        if (column.header !== 'ID' && column.header !== 'Created At' && column.header !== 'Updated At' && column.header !== 'SoldQTY' && column.header !== 'Modify At') {
            return <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                    setValues({...values, [e.target.name]: e.target.value})
                }
            />
        } else {
            return null
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Product</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: {xs: '300px', sm: '360px', md: '400px'},
                            gap: '1.5rem',
                        }}
                    >
                        {columns.map((column) =>
                            createInputsDialog(column)
                        )}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{p: '1.25rem'}}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Product
                </Button>
            </DialogActions>
        </Dialog>
    );
};
