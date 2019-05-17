const initState = {
    id: '',
    username: '',
    email: '',
    password: '',
    token: ''
}

const rootReducer = (state = initState, action) => {
    const { id, username, email, password, token } = action
    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                id,
                username,
                email,
                password,
                token
            }
        case "VERIFY":
            return {
                ...state,
                id,
                username,
                email,
                password,
                token
            }
        case "LOGOUT":
            localStorage.clear()
            return {
                ...state,
                id: '',
                username: '',
                email: '',
                password: '',
                token: ''
            }
        default:
            return state
    }
}

export default rootReducer