import axios from 'axios'
import Swal from 'sweetalert2'

const register = (payload) => {
    return (dispatch, getState) => {
        const { username, email, password } = payload
        axios
            .post('http://localhost:3000/register', {
                username,
                email,
                password
            })
            .then(({ data }) => {
                console.log(data, '=== REGISTERED USER')
                return axios
                    .post('http://localhost:3000/login', {
                        email,
                        password
                    })
            })
            .then(({ data }) => {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                localStorage.setItem('username', data.username)
                localStorage.setItem('id', data.id)
                localStorage.setItem('token', data.token)
                const { id, token } = data
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: 'Signed up successfully!'
                })
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

export { register }