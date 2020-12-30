import React, {useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';
import SockJsClient from 'react-stomp';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function ChatRoom(props){
    const user = useSelector(state => state.user)
    const room_id = props.match.params.room_id;
    let socket = new SockJS("http://localhost:8080/chat");
    let stompClient = Stomp.over(socket);

    const [Chat, setChat] = useState('');
    const [Users, setUser] = useState([]);
    const [ChatList, setChatList] = useState([]);
        
    const onChatHandler = (event) => {
        setChat(event.currentTarget.value);
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        sendMessage("Message");
        setChat('');
    }

    const onMessageHandler = (data) => {
        let msgInfo = JSON.parse(data.body);
        if(msgInfo.msg_type === 'Enter'){
            setUser((prev) => [...prev, {id : msgInfo.user_id, name : msgInfo.user_name}]);
        }
        if(msgInfo.msg_type === 'Exit'){
            setUser((prev) => prev.filter((u) => u.id !== user.authInfo.id));
        }
        setChatList((prev) => [...prev, msgInfo]);
    }

    const connect = () => {
        stompClient.connect({}, () => {
            stompClient.subscribe('/sub/chat/' + room_id, onMessageHandler);
            sendMessage("Enter");
        });
    }

    const disconnect= (e) => {
        sendMessage("Exit");
        stompClient.disconnect();
    }

    const sendMessage = (msg_type) => {
        let msg;
        switch (msg_type){
            case "Enter":
               msg = user.authInfo.name + '님이 입장하셨습니다.' ;
               break;
            case "Exit":
                msg = user.authInfo.name + '님이 퇴장하셨습니다.' ;
                break;
            case "Message":
                msg = Chat ;
                break; 
            default:
                msg = '';
        }

        stompClient.send('/pub/chat/' + room_id, {}, JSON.stringify({
            msg_type : msg_type,
            user_id : user.authInfo.id,
            user_name : user.authInfo.name,
            message : msg
            })
        )
    }
    useEffect(() => {
        //window.addEventListener('popstate', disconnect);
        window.addEventListener('beforeunload', disconnect);
        connect();
    }, [])

    return (
        <div>
            <div>
        {ChatList && ChatList.map((chat, index) => {
            return (<div>
                <text>{index + ' ' + chat.user_name + ' ' + chat.message}</text>
                </div>)
        })}
        </div>
        <div style={{
            display : 'flex', justifyContent : 'center',
            alignItems : 'center', width : '100%'
        }}>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={Chat}
                    onChange={onChatHandler}
                />
            <InputGroup.Append>
                <Button variant="outline-secondary" onClick={onSubmitHandler}>Button</Button>
            </InputGroup.Append>
        </InputGroup>
        </div>
        </div>
    )
}

export default ChatRoom;