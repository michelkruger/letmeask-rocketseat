import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import illustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function Home() {

    const history = useHistory();

    const [roomCode, setRoomCode] = useState('');

    const { user, signInWithGoogle } = useAuth()

    async function handleCreateRoom() {

        if(!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
    }

    async function handleJoinRoom(event:FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') {
            return;
        }

        const roomsRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomsRef.exists()){
            alert('Room does not exists.')
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return(
       <div id="page-auth">
           <aside>
                <img src={illustrationImg} alt="illustration pic"/>
                <strong>
                    Crie salas de Q&amp;A ao-vivo
                </strong>
                <p>
                    Tire as dúvidas da sua audiência em tempo-real
                </p>
           </aside>
           <main>
               <div className="main-container">
                    <img src={LogoImg} alt="LetMeAsk"/>
                    <button className="create-room" onClick={handleCreateRoom}>
                            <img src={GoogleIcon} alt="Google Icon"/>
                            Crie a sua Sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={({target}) => setRoomCode(target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
               </div>
           </main>
       </div> 
    )
}