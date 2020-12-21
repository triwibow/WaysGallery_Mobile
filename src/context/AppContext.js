import React, {createContext, useReducer} from 'react';

export const AppContext = createContext();

const initialState = {
    login: false,
    loading: true,
}

const reducer = (state, action) => {
    
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                login: true,
                loading: false,
            }

        // case 'LOAD_USER':
        //     return {
        //         ...state,
        //         login: true,
        //         loading: false,
        //         user: localStorage.setItem('user', JSON.stringify({
        //             id: action.payload.id,
        //             email: action.payload.email,
        //             chanelName: action.payload.chanelName,
        //             description: action.payload.description,
        //             thumbnail: action.payload.thumbnail,
        //             photo: action.payload.photo
        //         }))
        //     }
        
        case 'LOGOUT':
            return {
                ...state,
                login: false,
                loading: false
            }
        default:
            throw new Error();
    }
}



export const AppContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}