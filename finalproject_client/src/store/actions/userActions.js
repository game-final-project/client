import axios from 'axios'
import Swal from 'sweetalert2'
const baseURL = 'http://35.247.190.168'

const register = (payload) => {
    return (dispatch, getState) => {
        const { username, email, password, props } = payload
        axios
            .post(`${baseURL}/register`, {
                username,
                email,
                password
            })
            .then(({ data }) => {
                console.log(data, '=== REGISTERED USER')
                return axios
                    .post(`${baseURL}/login`, {
                        email,
                        password
                    })
            })
            .then(({ data }) => {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                localStorage.setItem('username', data.username)
                localStorage.setItem('id', data.id)
                localStorage.setItem('score', data.score)
                localStorage.setItem('token', data.token)
                const { id, token } = data
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: 'Signed up successfully!'
                })
                props.history.push('/Game');
                dispatch({
                    type: 'REGISTER',
                    email,
                    password,
                    username,
                    id,
                    token
                })
            })
            .catch((err) => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
    }
}

const login = (payload) => {
    return (dispatch, getState) => {
        const { email, password, props } = payload
        axios
            .post(`${baseURL}/login`, {
                email,
                password
            })
            .then(({ data }) => {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                localStorage.setItem('username', data.username)
                localStorage.setItem('id', data.id)
                localStorage.setItem('score', data.score)
                localStorage.setItem('token', data.token)
                const { id, token } = data
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: 'Signed In successfully!'
                })

                props.history.push('/Game');
                dispatch({
                    type: 'REGISTER',
                    email,
                    password,
                    username: data.username,
                    id,
                    token
                })
            })
            .catch((err) => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
    }
}

const getPlayers = (payload) => {
    return (dispatch, getState) => {
        axios({
            method: 'GET',
            url: `${baseURL}/users`
        })
            .then(({ data }) => {
                dispatch({
                    type: 'GET_PLAYERS',
                    allPlayer: data
                })
            })
            .catch((err) => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
    }
}

export { register, login, getPlayers }