import React, {useState} from 'react';
import axios from 'axios'

function Login(props){
    const [Email, setEmail] = useState('');
    const [Password , setPassword] = useState('');
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email : Email,
            password : Password
        }
        axios.post("/login", body)
        .then((res) => {
            if(res.data.success){
                window.localStorage.setItem("token", res.data.token);
                props.history.push('/');
            } else
                alert("Login faild");
        })
        
    }
    return (
        <div style={{
            display : 'flex', justifyContent : 'center',
            alignItems : 'center', width : '100%', height : '100vh'
        }}>
            <form style={{display : 'flex', flexDirection : 'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                 <br/>
                <button>LogIn</button>
            </form>
        </div>
    )
}

export default Login;