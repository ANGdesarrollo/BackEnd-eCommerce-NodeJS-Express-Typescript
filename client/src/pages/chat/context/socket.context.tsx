import io, {Socket} from 'socket.io-client';
import {API_URL} from '../../../config/configAPI';
import {type ReactNode, useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import {IChat, IResponseMessage} from "../../../interfaces/interfaceChats";

interface Props {
    children: ReactNode;
}

interface Context {
    socket: Socket;
    allChats?: IChat[];
    sendMessage?: (data: IResponseMessage) => void;
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

    const sendMessage = (data: IResponseMessage) => {
        socket.emit('admin_message', (data) )
    };

    socket.on('server_chat', (chat: IChat) => {
        if(allChats) {
           const indexChat = allChats.findIndex(el => el._id === chat._id);
           if(indexChat !== -1) {
               const updatedChats = [...allChats];
               updatedChats[indexChat] = chat;
               setAllChats(updatedChats);
           }
        }
    })

    return (
        <SocketContext.Provider value={{socket, allChats, sendMessage}}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSockets = () => useContext(SocketContext);
