import {useCallback, useEffect, useMemo, useState} from 'react';
import {
    type MaterialReactTableProps,
    type MRT_Cell,
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import {
    Avatar, Tooltip,
} from '@mui/material';
import {CreatedProduct, IProduct, IProductDTO} from "../../interfaces/interfaceProduct";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {createProduct, deleteProduct, getProducts, updateProduct} from "../../store/slices/products/thunk";
import {useValidators} from "../../hooks/useValidators";
import {ProductsLayout} from "./ProductsLayout";

export const ProductsContainer = () => {
    const dispatch = useAppDispatch();
    const {products} = useAppSelector(state => state);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<IProduct[]>([]);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        setTableData(products.products)
        if (products.products) {
            setTableData(products.products);
        }
    }, [products]);

    const handleCreateNewRow = (values: CreatedProduct) => {
        const structuredData: IProductDTO = {
            name: values.name,
            price: Number(values.price),
            thumbnail: {
                imgPath: values["thumbnail.imgPath"],
                backgroundPath: values["thumbnail.backgroundPath"],
            },
            stock: Number(values.stock),
            discount: Number(values.discount),
            category: values.category,
            details: values.details,
        }
        dispatch(createProduct(structuredData));
    };

    const handleSaveRowEdits: MaterialReactTableProps<IProduct>['onEditingRowSave'] =
        async ({exitEditingMode, values}) => {
            const structuredData: IProduct = {
                _id: values._id,
                name: values.name,
                price: Number(values.price),
                thumbnail: {
                    imgPath: values["thumbnail.imgPath"],
                    backgroundPath: values["thumbnail.backgroundPath"],
                },
                updatedAt: values.updatedAt,
                createdAt: values.createdAt,
                soldQty: values.soldQty,
                stock: Number(values.stock),
                discount: Number(values.discount),
                category: values.category,
                details: values.details,
            }
            if (!Object.keys(validationErrors).length) {
                dispatch(updateProduct(structuredData));
                exitEditingMode();
            }
        };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<IProduct>) => {
            if (
                !confirm(`Are you sure you want to delete ${row.getValue('name')}?`)
            ) {
                return;
            }
            const rowToDeleteID: string = tableData[row.index]._id;
            dispatch(deleteProduct(rowToDeleteID))
        },
        [tableData],
    );

    const {validateRequired} = useValidators();
    const getCommonEditTextFieldProps = useCallback(
        (
            cell: MRT_Cell<IProduct>,
        ): MRT_ColumnDef<IProduct>['muiTableBodyCellEditTextFieldProps'] => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid = validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
        () => [
            {
                accessorKey: '_id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,

            },
            {
                accessorKey: 'thumbnail.imgPath',
                header: 'Img',
                size: 80,
                Cell: ({row}) => (
                    <Avatar src={row.original.thumbnail.imgPath}/>
                )
            },
            {
                accessorKey: 'thumbnail.backgroundPath',
                header: 'Background Img',
                size: 80,
                Cell: ({row}) => (
                    <Avatar src={row.original.thumbnail.backgroundPath}/>
                )
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'price',
                header: 'Price',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },
            {
                accessorKey: 'category',
                header: 'Category',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell)
                }),
            },
            {
                accessorKey: 'discount',
                header: 'Discount',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },
            {
                accessorKey: 'soldQty',
                header: 'SoldQTY',
                size: 80,
                enableEditing: false,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },
            {
                accessorKey: 'stock',
                header: 'Stock',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },
            {
                accessorKey: 'details',
                header: 'Details',
                size: 80,
                Cell: ({ cell }) => (
                    <Tooltip title={cell.row.original.details}>
                        <span>{cell.row.original.details.slice(0, 20)}...</span>
                    </Tooltip>
                ),
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell)
                }),
            },
            {
                accessorKey: 'createdAt',
                header: 'Created At',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell)
                }),
            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated At',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell)
                }),
            },
        ],
        [getCommonEditTextFieldProps],
    );

    return (
        <ProductsLayout columns={columns} tableData={tableData} handleSaveRowEdits={handleSaveRowEdits}
                        handleCancelRowEdits={handleCancelRowEdits} handleDeleteRow={handleDeleteRow}
                        setCreateModalOpen={setCreateModalOpen} createModalOpen={createModalOpen}
                        handleCreateNewRow={handleCreateNewRow}/>
    );
};

