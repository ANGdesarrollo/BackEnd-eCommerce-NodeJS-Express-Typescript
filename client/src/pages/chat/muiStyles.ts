export const RoomChatContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '50%',
    right: '50%',
    transform: "translate(50%, -50%)",
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    width: '100vw',
    height: '100vh',
    zIndex: 3,
}

export const RoomChatSubContainerStyles = {
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '70%',
    border: '2px solid #1976d2',
}

export const CloseButtonBoxStyles = {
    width: '100%',
    height: '5%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
}

export const ChatSendMessagesStyles = {
    position: 'relative',
    height: '10%',
    width: '100%',
}

export const ChatMessagesStyles = {
    width: '100%',
    height: '80%',
    border: '2px solid #1976d2',
    overflowY: 'scroll',
}

export const ButtonSendStyles = {
    position: "absolute",
    top: "50%",
    right: "0",
    transform: "translate(0, -50%)",
}
