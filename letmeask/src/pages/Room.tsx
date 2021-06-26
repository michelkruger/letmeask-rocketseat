import LogoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router';
import '../styles/rooms.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useEffect } from 'react';

type RoomParams = {
    id: string;
}

type Question = {
    id:string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}

type FirebaseQuestons = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;

}>

export function Room() {

    const { user } = useAuth();

    const [newQuestion, setNewQuestion ] = useState('');
    const [questions, setQuestions ] = useState<Question[]>([]);
    const [title, setTitle ] = useState('');

    const params = useParams<RoomParams>();

    const roomId = params.id;

    useEffect(() => {
        const roonRef = database.ref(`romms/${roomId}`);

        roonRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestons = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }

        if(!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/question`).push(question)

        setNewQuestion('')
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImg} alt="Logo - LetMeAsk"/>
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>sala {title}</h1>
                    {questions.length > 0 && 
                        <span> {questions.length} pergunta(s) </span>
                    }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={({target}) => setNewQuestion(target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name}/>
                                <span>{user.name}</span>
                            </div>
                            ) : (
                                <span> 
                                    Para enviar uma pergunta, 
                                    <button>
                                        faça seu login.
                                    </button>
                                </span>
                            )
                        }
                        <Button type="submit" disabled={!user}> Enviar pergunta </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}