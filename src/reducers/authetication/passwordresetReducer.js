import { passwordResetTypes } from "../../types/authetication";
const initialState = {
    isLoading : false,
}
export const passwordresetReducer = (state = initialState, action) => {
const {type} = action
switch (type) {
    case passwordResetTypes.PASSWORRESET_REQUEST:
        return {
            isLoading:true,
        }
    case passwordResetTypes.PASSWORRESET_SUCCESS:
        return {
            isLoading:false,
        }
    case passwordResetTypes.PASSWORRESET_FAIL:
        return {
            isLoading:false,
        }
    default:
       return {state}
}
}