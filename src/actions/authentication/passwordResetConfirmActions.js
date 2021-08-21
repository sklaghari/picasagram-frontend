import { passwordResetConfirmTypes } from '../../types/authetication'
import { GET_ERRORS } from '../../types/error'
import axios from 'axios'

export const passwordresetconfirm = (uid, token, new_password) => async dispatch => {
dispatch({
    type: passwordResetConfirmTypes.PASSWORRESETCONFIRM_REQUEST
})
const configuration = {
    headers : {
        'Content-Type':'application/json'
    }
}
const data = JSON.stringify({uid, token, new_password})
try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, data, configuration )
    dispatch({
        type : passwordResetConfirmTypes.PASSWORRESETCONFIRM_SUCCESS,
    })
}
catch(err){
    console.log(err.response.data)
    const error = {msg : err.response.data, status: err.response.status }
    dispatch({
        type : passwordResetConfirmTypes.PASSWORRESETCONFIRM_FAIL,
    })
    dispatch({
        type: GET_ERRORS,
        payload: error
    })
}
}