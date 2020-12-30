import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MainPage(props){
    const [Rooms, setRooms] = useState([]);

    useEffect(() => {
        console.log('a');
        axios.get("/all_rooms")
        .then((res) => {
            setRooms([...res.data]);
        })
    }, []);

    return(<div>
        {Rooms && Rooms.map((room, index) => {
            return (<div>
                    <Link to={`/room/${room.id}`}><label>{index}</label>{room.name}</Link>
                </div>)
        })}
        <button><Link to="/create_room">방 만들기</Link></button>

    </div>)
}

export default MainPage;