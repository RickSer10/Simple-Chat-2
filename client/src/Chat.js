
import { useState, useEffect } from 'react';
import sapo from './assets/imagen.png';

const Chat = ({ socket, user, room }) => {

    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);

    const envioMensaje = async (e) => {

        if (user && message) {
            const newMessage = {
                body: message,
                room,
                author: user,
                time: new Date(Date.now()).getHours()
                    + " : " +
                    new Date(Date.now()).getMinutes(),
                isOwn: true,
            };
            await socket.emit("send_message", newMessage)
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    }

    useEffect(() => {

        socket.on('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, { ...data, isOwn: false }]);
        });
        return () => {
            socket.off('message');
        };

    }, [socket]);



    return (
        <div>
            <div className='flex justify-center'>
                <img src={sapo} className='w-28' alt='Icon'></img>
            </div>
            <div className='p-2 border border-emerald-950 rounded font-extrabold text-lg text-center'>
                Chat de Sala : {room}
                <br />
                Usuario : {user}
            </div>

            <div className='bg-emerald-500 p-6 border border-emerald-950 rounded'>
                <div className='flex items-center justify-center'>

                </div>

                <div className='h-80 w-80 overflow-y-auto bg-lime-400 border border-emerald-950 rounded-xl text-emerald-950'>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex w-full ${msg.isOwn ? 'justify-end' : 'justify-start'} mb-2`}
                        >
                            <div
                                className={`p-3.5 rounded-lg max-w-xs m-1 ${msg.isOwn
                                            ? 'bg-sky-500 text-white text-right'
                                            : 'bg-lime-600 text-black text-left'
                                    }`}
                                style={{ wordWrap: 'break-word', maxWidth: '70%' }}
                            >
                                <span className="block text-wrap"><strong>{msg.author}</strong>: &nbsp; {msg.body}</span>
                                <span className="text-xs">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>


                <div className='flex flex-row justify-evenly items-center'>
                    <input
                        type="text" autoFocus
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}

                        className='bg-gray-300 
                        border border-emerald-950 rounded-xl
                        p-2 m-3 w-auto'/>

                    <button type="submit"
                        className='bg-blue-600 hover:bg-blue-700
                    text-white font-extrabold
                    border border-blue-950 rounded-xl hover:border-blue-800
                    p-3 py-2'

                        onClick={envioMensaje}>
                        ENVIAR
                    </button>
                </div>

            </div>
        </div >
    )
}

export default Chat