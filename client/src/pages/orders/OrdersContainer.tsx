import {useEffect, useMemo, useState} from 'react';
import MaterialReactTable, {type MRT_ColumnDef} from 'material-react-table';
import {Avatar, Container} from "@mui/material";
import {axiosApi} from "../../config/axiosApi";
import {IOrder, IOrderDetail} from "../../interfaces/interfaceOrders";
import IconButton from "@mui/material/IconButton";
import {ArrowBack, Visibility} from "@mui/icons-material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useRedux";
import {IProduct} from "../../interfaces/interfaceProduct";

export const OrdersContainer = (): JSX.Element => {
    const {products} = useAppSelector(row => row.products);
    const navigate = useNavigate();
    const [dataRow, setDataRow] = useState<IOrder[]>([]);
    const [dataDetailRow, setDataDetailRow] = useState<IOrderDetail[]>([]);
    const [allProducts, setAllProducts] = useState<IProduct[]>();
    const {idUser} = useParams();
    const getAllOrders = (): void => {
        axiosApi.get('/order')
            .then(({data}) => {
                const {allOrders} = data;
                setDataRow(allOrders);
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getAllOrders();
        setAllProducts(products);
    }, []);

    useEffect(() => {
        if (idUser) {
            const newData = dataRow.find((el) => el._id === idUser);
            if (newData && allProducts) {
                const dataUpdated = newData.products.map((el) => {
                    const product = allProducts.find((p) => p._id === el._id);
                    if (product) {
                        return {
                            ...el,
                            thumbnail: product.thumbnail.imgPath,
                            price: product.price,
                            name: product.name,
                            totalPrice: `US$${product.price * el.qty}`,
                        };
                    }
                    return el;
                });
                setDataDetailRow(dataUpdated);
            }
        }
    }, [idUser]);

    const columns = useMemo<MRT_ColumnDef<IOrder>[]>(
        () => [
            {accessorKey: '_id', header: 'ID', size: 80},
            {accessorKey: 'username', header: 'Username'},
            {accessorKey: 'created_at', header: 'Created at',},
            {accesorKey: 'access', header: 'Access', size: 80,
                Cell: (row) => (
                    <IconButton onClick={() => {
                        navigate(`/dashboard/orders/${row.row.original._id}`);
                    }}><Visibility/></IconButton>
                )
            }
        ],
        [],
    );

    const columnsProduct = useMemo<MRT_ColumnDef<IOrderDetail>[]>(
        () => [
            {accessorKey: '_id', header: 'ID', size: 80},
            {accessorKey: 'thumbnail', header: 'Thumbnail',
                Cell: ({row}) => (
                    <Avatar src={row.original.thumbnail}/>
                )},
            {accessorKey: 'qty', header: 'Qty',},
            {accessorKey: 'price', header: 'Price',},
            {accessorKey: 'totalPrice', header: 'Total'},
            {accesorKey: 'back', header: 'Back', size: 80,
                Cell: () => (
                    <IconButton onClick={() => {
                        navigate('/dashboard/orders');
                    }}><ArrowBack/></IconButton>
                )
            }
        ],
        [],
    );





    return (
        <Container>
            {(dataRow && !idUser) &&
                <MaterialReactTable columns={columns} data={dataRow}/>}
            {(dataRow && idUser) &&
                <MaterialReactTable columns={columnsProduct} data={dataDetailRow}/>}
        </Container>

    );
};
