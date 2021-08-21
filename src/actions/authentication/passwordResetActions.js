import { passwordResetTypes } from '../../types/authetication'
import { GET_ERRORS } from '../../types/error'
import axios from 'axios'

export const passwordreset = (email) => async dispatch => {
dispatch({
    type: passwordResetTypes.PASSWORRESET_REQUEST
})
const configuration = {
    headers : {
        'Content-Type':'application/json'
    }
}
const data = JSON.stringify({email})
try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, data, configuration )
    dispatch({
        type : passwordResetTypes.PASSWORRESET_SUCCESS,
    })
}
catch(err){
    console.log(err.response.data)
    const error = {msg : err.response.data, status: err.response.status }
    dispatch({
        type : passwordResetTypes.PASSWORRESET_FAIL,
    })
    dispatch({
        type: GET_ERRORS,
        payload: error
    })
}
}