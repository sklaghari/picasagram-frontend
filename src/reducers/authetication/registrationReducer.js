import { registrationTypes,googleAuthTypes,facebookAuthTypes } from "../../types/authetication";
const initialState = {
    registering : false,
    isSignedup:false,
}
export const registrationReducer = (state = initialState, action) => {
const {type} = action
switch (type) {
    case registrationTypes.SIGNUP_REQUEST:
    case googleAuthTypes.GOOGLE_AUTH_REQUEST:
    case facebookAuthTypes.FACBOOK_AUTH_REQUEST:
        return {
            registering:true,
        }
    case registrationTypes.SIGNUP_SUCCESS:
    case googleAuthTypes.GOOGLE_AUTH_SUCCESS:
    case facebookAuthTypes.FACBOOK_AUTH_SUCCESS:
        return {
            registering:false,
            isSignedup:true,
        }
    
    case registrationTypes.SIGNUP_FAIL:
    case googleAuthTypes.GOOGLE_AUTH_FAIL:
    case facebookAuthTypes.FACBOOK_AUTH_FAIL:
        return {
            registering:false,
    }
    default:
       return {state}
}
}