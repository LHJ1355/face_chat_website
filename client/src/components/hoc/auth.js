import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../../_actions/user_action'

function Authentication (SpecificComponent, option, adminRoute = null){
    //option
    //null = 아무나 출입가능
    //true = 로그인 한 유저만 출입가능
    //false = 로그인 하지 않은 유저만 출입가능
    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth())
            .then(res => {
                //로그인 하지 않은 상태
                console.log(res.payload);
                if(!res.payload.auth){
                    if(option){
                        props.history.push('/login');
                    }
                }else {   //로그인 한 상태
                    
                    if(option === false){
                        props.history.push('/');
                    }
                    if(adminRoute && !res.payload.isAdmin){
                        props.history.push('/');
                    }
                }
            })
        }, [])

        return <SpecificComponent {...props}/>
    }

    return AuthenticationCheck;
}

export default Authentication;