import { googleAuthTypes } from '../../types/authetication'
import { GET_ERRORS } from '../../types/error'
import axios from 'axios'

export const googleLogin = (accesstoken) => async dispatch => {
dispatch({
    type: googleAuthTypes.GOOGLE_AUTH_REQUEST
})
try {
    let res = await axios.post(`${process.env.REACT_APP_API_URL}/dj-rest-auth/google/`,{access_token: accesstoken});
    console.log(res.data)
    dispatch({
        type : googleAuthTypes.GOOGLE_AUTH_SUCCESS,
        payload : res.data
    })
}
catch(err){
    console.log(err.response.data)
    const error = {msg : err.response.data, status: err.response.status }
    dispatch({
        type : googleAuthTypes.GOOGLE_AUTH_FAIL,
    })
    dispatch({
        type: GET_ERRORS,
        payload: error
    })
}
}