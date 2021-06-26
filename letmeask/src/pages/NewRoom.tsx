import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import illustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg'

import '../styles/auth.scss';
import { Button } from "../components/Button";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export function NewRoom() {

    const {user} = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom ] = useState('');

    async function handleCreateRoom(event:FormEvent) {
        event.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            author: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return(
       <div id="page-auth">
           <aside>
                <img src={illustrationImg} alt="illustration pic"/>
                <strong>
                    Crie salas de Q$amp;A ao-vivo
                </strong>
                <p>
                    Tire as dúvidas da sua audiência em tempo-real
                </p>
           </aside>
           <main>
               <div className="main-container">
                    <img src={LogoImg} alt="LetMeAsk"/>
                    <h2> Criar uma nova sala </h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={ ({target}) => setNewRoom(target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                    </form>
               </div>
           </main>
       </div> 
    )
}