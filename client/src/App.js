import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Auth from './components/hoc/auth';
import Create from './components/CreateRoomPage';
import ChatRoom from './components/ChatRoomPage';
import FaceChat from './components/FaceChatPage';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Auth(MainPage, true)}/>
        <Route path="/signup" component={Auth(Signup, false)} />
        <Route path="/login" component={Auth(Login, false)} />
        <Route path="/create_room" component={Auth(Create, true)} />
        <Route path="/room/:room_id" component={Auth(ChatRoom, true)} />
        <Route path="/face_chat/:room_id" component={Auth(FaceChat, true)} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
