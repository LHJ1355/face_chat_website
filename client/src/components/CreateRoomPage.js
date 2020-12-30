import React, {useState} from 'react';
import axios from 'axios'

function Create(props){
    const [Name, setName] = useState('');
    
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            name : Name
        }
        axios.post("/create_room", body)
        .then((res) => {
            if(res.data.success){
                props.history.push('/');
            } else
                alert("Faild");
        })
        
    }
    return (
        <div style={{
            display : 'flex', justifyContent : 'center',
            alignItems : 'center', width : '100%', height : '100vh'
        }}>
            <form style={{display : 'flex', flexDirection : 'column'}}
                onSubmit={onSubmitHandler}>
                <label>방 이름</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                 <br/>
                <button>방 만들기</button>
            </form>
        </div>
    )
}

export default Create;