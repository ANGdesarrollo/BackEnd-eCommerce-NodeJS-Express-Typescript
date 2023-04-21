import {useEffect, useMemo, useState} from 'react';
import MaterialReactTable, {type MRT_ColumnDef} from 'material-react-table';
import {IChat, IResponseMessage} from "../../interfaces/interfaceChats";
import {useSockets} from "./context/socket.context";
import { Login } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Container} from "@mui/material";
import {RoomChat} from "./components/RoomChat";
import {useAppSelector} from "../../hooks/useRedux";

export const ChatContainer = (): JSX.Element => {
    const { sendMessage } = useSockets();
    const [ messageValue, setMessageValue ] = useState('');
    const { username } = useAppSelector(status => status.auth);
    const [ openCloseRoom, setOpenCloseRoom ] = useState<boolean>(false);
    const [ informationRoom, setInformationRoom ] = useState<IChat>()
    const { allChats } = useSockets();

    const handleRoom = (): void => {
        setOpenCloseRoom(!openCloseRoom)
    }

    const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }): void => {
        event.preventDefault();
        if(username && informationRoom && messageValue.trim() !== '') {
            const dataMessage: IResponseMessage = {
                idRoom: informationRoom._id,
                username,
                message: messageValue,
            };
            if(dataMessage.idRoom && username && dataMessage.message) {
                sendMessage && sendMessage(dataMessage)
                setMessageValue('');

            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessageValue(event.target.value);
    };

    useEffect(() => {
        if(informationRoom && allChats) {
            const indexChat = allChats.findIndex(el => el._id === informationRoom._id);
            const updatedRoom = allChats[indexChat];
            setInformationRoom(updatedRoom);
        }
    }, [allChats]);


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
                    <IconButton onClick={() => {
                        !informationRoom && setInformationRoom(row.row.original);
                        handleRoom();
                    }}><Login/></IconButton>
                )

            }
        ],
        [],
    );

    return (
        <Container>
            {allChats &&
            <MaterialReactTable columns={columns} data={allChats} />}
            {openCloseRoom && <RoomChat informationRoom={informationRoom} handleRoom={handleRoom} handleSubmit={handleSubmit} messageValue={messageValue} handleChange={handleChange}/>}
        </Container>

    );
};
