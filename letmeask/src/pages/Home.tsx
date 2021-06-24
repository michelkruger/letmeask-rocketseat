import React from "react";

import illustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
import { Button } from "../components/Button";

export function Home() {
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
                    <button className="create-room">
                            <img src={GoogleIcon} alt="Google Icon"/>
                            Crie a sua Sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                        </div>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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