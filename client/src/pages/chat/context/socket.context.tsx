import io, {Socket} from 'socket.io-client';
import {API_URL} from '../../../config/configAPI';
import {type ReactNode, useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import {IChat} from "../../../interfaces/interfaceChats";

interface Props {
    children: ReactNode;
}

interface Context {
    socket: Socket;
    allChats?: IChat[];
}

const socket = io(API_URL, {
    withCredentials: true,
});

export const SocketContext = createContext<Context>({socket});

export const SocketsProvider = ({children}: Props) => {
    const [allChats, setAllChats] = useState<IChat[]>();

    useEffect(() => {
        socket.on('server_allMessages', (allChats: IChat[]) => {
            setAllChats(allChats)
        })
    }, []);

    useEffect(() => {
        console.log(allChats)
    }, [allChats])



    const sendMessage = () => {
    };

    useEffect(() => {
        sendMessage();
    }, []);
    return (
        <SocketContext.Provider value={{socket, allChats}}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSockets = () => useContext(SocketContext);
