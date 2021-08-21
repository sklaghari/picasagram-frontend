import { passwordResetConfirmTypes } from "../../types/authetication";
const initialState = {
    isLoading : false,
    passwordChanged:false
}
export const passwordresetConfirmReducer = (state = initialState, action) => {
const {type} = action
switch (type) {
    case passwordResetConfirmTypes.PASSWORRESETCONFIRM_REQUEST:
        return {
            isLoading:true,
            passwordChanged:false
        }
    case passwordResetConfirmTypes.PASSWORRESETCONFIRM_SUCCESS:
        return {
            isLoading:false,
            passwordChanged:true
        }
    case passwordResetConfirmTypes.PASSWORRESETCONFIRM_FAIL:
        return {
            isLoading:false,
            passwordChanged:false
        }
    default:
       return {state}
}
}