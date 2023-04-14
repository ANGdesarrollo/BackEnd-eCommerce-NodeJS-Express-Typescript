import { useMemo } from 'react';
import MaterialReactTable, {type MRT_ColumnDef, MRT_Row} from 'material-react-table';
import {IChat} from "../../interfaces/interfaceChats";
import {useSockets} from "./context/socket.context";
import {Avatar} from "@mui/material";
import { Login } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export const ChatContainer = () => {
    const { allChats } = useSockets();
    const columns = useMemo<MRT_ColumnDef<IChat>[]>(
        () => [
            {
                accessorKey: '_id', //access nested data with dot notation
                header: 'ID',
                size: 80
            },
            {
                accessorKey: 'username',
                header: 'Username',
            },
            {
                accessorKey: 'created_at', //normal accessorKey
                header: 'Created at',
            },
            {
                accesorKey: 'edit',
                header: 'Access Room',
                size: 80,
                Cell: (row) => (
                    <IconButton onClick={() => console.log(row.row.original)}><Login/></IconButton>
                )

            }
        ],
        [],
    );

    return (allChats && <MaterialReactTable columns={columns} data={allChats} />);
};
