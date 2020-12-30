function userReducer(state={}, action){
    switch(action.type){
        case 'AUTH_USER' : 
            return {...state, authInfo : action.payload }
            break;
        default :
            return state;
    }
}

export default userReducer;