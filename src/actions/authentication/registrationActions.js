import { registrationTypes } from '../../types/authetication'
import { GET_ERRORS } from '../../types/error'
import axios from 'axios'

export const registration = (first_name, last_name, email, password) => async dispatch => {
dispatch({
    type: registrationTypes.SIGNUP_REQUEST
})
const configuration = {
    headers : {
        'Content-Type':'application/json'
    }
}
const data = JSON.stringify({first_name, last_name, email,password})
try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, data, configuration )
    dispatch({
        type : registrationTypes.SIGNUP_SUCCESS,
    })
}
catch(err){
    const error = {msg : err.response.data, status: err.response.status }
    dispatch({
        type : registrationTypes.SIGNUP_FAIL,
    })
    dispatch({
        type: GET_ERRORS,
        payload: error
    })
}
}