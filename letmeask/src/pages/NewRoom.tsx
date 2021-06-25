import React from "react";
import { Link } from "react-router-dom";

import illustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
import { Button } from "../components/Button";

export function NewRoom() {
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
                    <form action="">
                        <input
                            type="text"
                            placeholder="Nome da sala"
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