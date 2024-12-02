import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect(process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000');

function App() {

  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [showForm, setShowForm] = useState(true);

  const joinRoom = () => {
    if (user !== '' && room !== '') {
      socket.emit("join_room", room)
      setShowForm(false);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-800
                  text-emerald-950 font-semibold ">

      {showForm && (
        <div className='h-screen w-screen fixed flex items-center justify-center 
        bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-800'>
          <div className='bg-teal-500 flex flex-col items-center
            font-extrabold rounded-xl '>
          <h3 className='bg-teal-600 w-full text-2xl text-center'>Entrar a Sala</h3>
          <input
            type='text'
            placeholder='Usuario'
            onChange={(e) => setUser(e.target.value)}
            className='m-3 p-1 text-gray-800 border border-teal-950 rounded-sm bg-gray-200'
          />
          <input
            type='text'
            placeholder='ID Sala'
            onChange={(e) => setRoom(e.target.value)}
            className='m-2 p-1 text-gray-800 border border-teal-950 rounded-sm bg-gray-200'
          />
          <button
            onClick={joinRoom}
            className='bg-blue-600 hover:bg-blue-700
                    text-white font-extrabold
                    border border-blue-950 rounded-xl hover:border-blue-800
                    p-2 m-2 w-40'>
            Ingresar
          </button>
        </div>
        
        </div>
      )}

      <br></br>
      <Chat socket={socket} user={user} room={room} />
    </div>
  );
}

export default App;
