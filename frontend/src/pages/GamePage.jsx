import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Choice from '../components/choice/Choice';
import Comment from "../components/comments/Comments"

export default function GamePage() {
    const [gameData, setGameData] = useState([])
    const { id } = useParams()
    useEffect(() => {
        const a = async () => {
            const res = await fetch(`http://localhost:5173/api/game/${id}`);
            const data = await res.json();
            console.log(data.data);
            setGameData(data.data);
        };
        a();
    }, []);
    return (<>
        <Choice game={gameData} />
        <Comment />
    </>)
}
