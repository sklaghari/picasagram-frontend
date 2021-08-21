import { activationTypes } from "../../types/authetication";
const initialState = {
    activating : false,
    isActivated: false
}
export const activationReducer = (state = initialState, action) => {
const {type} = action
switch (type) {
    case activationTypes.ACTIVATION_REQUEST:
        return {
            activating: true
        }
    case activationTypes.ACTIVATION_SUCCESS:
        return {
            isActivated: true,
            activating: false,
        }
    
    case activationTypes.ACTIVATION_FAIL:
        return {
            isActivated: false,
            activating: false,
    }
    default:
       return {state}
}
}