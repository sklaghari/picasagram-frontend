import { activationTypes } from '../../types/authetication'
import { GET_ERRORS } from '../../types/error'
import axios from 'axios'

export const activation = (uid, token) => async dispatch => {
dispatch({
    type: activationTypes.ACTIVATION_REQUEST
})
const configuration = {
    headers : {
        'Content-Type':'application/json'
    }
}
const data = JSON.stringify({uid,token})
try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, data, configuration )
    dispatch({type : activationTypes.ACTIVATION_SUCCESS})
}
catch(err){
    const error = {msg : err.response.data, status: err.response.status }
    dispatch({
        type : activationTypes.ACTIVATION_FAIL,
    })
    dispatch({
        type: GET_ERRORS,
        payload: error
    })
}
}